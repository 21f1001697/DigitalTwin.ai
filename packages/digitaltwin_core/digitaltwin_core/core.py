"""
DigitalTwin.ai — core prototype mechanism.

Simulates a mixed-model assembly line (30-50 stations) with uneven sensor
coverage (Tier A: instrumented, Tier B: vision-augmented, Tier C: manual
checklist only), injects a realistic degradation event, and runs the full
SEE -> MODEL -> PREDICT -> ACT pipeline:

  SEE      per-station signal generation at the tier-appropriate fidelity
  MODEL    per-station Isolation Forest anomaly scoring against its own
           learned baseline (unsupervised - no labelled fault data needed)
  PREDICT  discrete-event style propagation: given a degrading station,
           forecast which downstream stations starve, when, and which
           in-progress vehicles (by position) are exposed
  ACT      one ranked, explainable recommendation with a confidence band
           tied to the source station's sensor tier
"""

import numpy as np
from dataclasses import dataclass, field
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import RobustScaler

RNG = np.random.default_rng(42)

TIER_A = "instrumented"     # PLC/MES telemetry
TIER_B = "vision"           # camera-inferred (optical-flow proxy)
TIER_C = "manual"           # checklist only, no continuous signal

TIER_CONFIDENCE = {TIER_A: 0.97, TIER_B: 0.80, TIER_C: 0.45}


@dataclass
class Station:
    idx: int
    name: str
    tier: str
    baseline_cycle: float          # seconds
    baseline_std: float
    buffer_capacity: int = 6       # vehicles the upstream buffer can hold


@dataclass
class LineConfig:
    n_stations: int = 40
    tier_a_frac: float = 0.55
    tier_b_frac: float = 0.20
    # remainder is tier C
    takt_time: float = 60.0        # target seconds/station
    history_windows: int = 300     # "healthy" 1-second windows per station used to fit baseline


def build_line(cfg: LineConfig) -> list[Station]:
    n = cfg.n_stations
    n_a = int(n * cfg.tier_a_frac)
    n_b = int(n * cfg.tier_b_frac)
    tiers = [TIER_A] * n_a + [TIER_B] * n_b + [TIER_C] * (n - n_a - n_b)
    RNG.shuffle(tiers)
    zones = ["Body"] * (n // 3) + ["Paint"] * (n // 3) + ["Final Assembly"] * (n - 2 * (n // 3))
    stations = []
    for i in range(n):
        base = cfg.takt_time * RNG.uniform(0.85, 1.05)
        stations.append(Station(
            idx=i,
            name=f"ST{10 + i}",
            tier=tiers[i],
            baseline_cycle=base,
            baseline_std=base * RNG.uniform(0.03, 0.07),
        ))
    return stations


def _tier_feature_noise(tier: str) -> float:
    # Vision-inferred and manual-inferred signals are noisier than direct telemetry.
    return {TIER_A: 1.0, TIER_B: 1.6, TIER_C: 2.6}[tier]


def simulate_station_features(station: Station, n_windows: int, degrade_from: int | None,
                                degrade_severity: float) -> np.ndarray:
    """
    Returns an (n_windows, 4) feature matrix per 1-second window:
      [cycle_time, vibration_energy_proxy, motion_variability, rework_rate]
    Tier C stations still get a feature vector (the twin always models something),
    but it is reconstructed from noisier, indirect signals (buffer-implied cycle
    time + checklist pass/fail rate) rather than direct measurement.
    """
    noise = _tier_feature_noise(station.tier)
    feats = np.zeros((n_windows, 4))
    for t in range(n_windows):
        drift = 0.0
        if degrade_from is not None and t >= degrade_from:
            # gradual ramp, not an instant step - mirrors real equipment wear
            progress = min(1.0, (t - degrade_from) / 40.0)
            drift = degrade_severity * progress

        cycle = RNG.normal(station.baseline_cycle * (1 + drift), station.baseline_std * noise)
        vib = RNG.normal(1.0 + drift * 1.8, 0.08 * noise)
        motion_var = RNG.normal(1.0 + drift * 1.3, 0.10 * noise)
        rework = max(0.0, RNG.normal(drift * 0.6, 0.05 * noise))
        feats[t] = [cycle, vib, motion_var, rework]
    return feats


@dataclass
class StationResult:
    station: Station
    anomaly_score: float            # 0-1, higher = more anomalous
    confidence: float                # tier-driven, 0-1
    is_flagged: bool
    scores_over_time: np.ndarray


def fit_and_score(station: Station, features: np.ndarray, history_windows: int) -> StationResult:
    """Fit an Isolation Forest on the 'healthy' history slice, score the full run."""
    train = features[:history_windows]
    scaler = RobustScaler().fit(train)
    model = IsolationForest(n_estimators=150, contamination="auto", random_state=42)
    model.fit(scaler.transform(train))

    scaled_full = scaler.transform(features)
    raw = model.score_samples(scaled_full)          # higher = more normal
    # normalize to 0-1 anomaly score (higher = more anomalous), robust to run-specific scale
    lo, hi = raw.min(), raw.max()
    anomaly_over_time = 1 - (raw - lo) / (hi - lo + 1e-9)

    tail = anomaly_over_time[-30:].mean()
    flagged = tail > 0.62
    return StationResult(
        station=station,
        anomaly_score=float(tail),
        confidence=TIER_CONFIDENCE[station.tier],
        is_flagged=flagged,
        scores_over_time=anomaly_over_time,
    )


@dataclass
class PropagationForecast:
    source: Station
    affected: list[tuple[Station, float]]   # (station, minutes_until_impact)
    exposed_vehicle_range: tuple[int, int]
    exposed_count: int


def propagate(stations: list[Station], results: dict[int, StationResult],
               source_idx: int, degrade_severity: float, vehicles_seen: int) -> PropagationForecast:
    """
    Discrete-event-style forward propagation: a slowed source station drains
    its upstream buffer at (extra cycle time / buffer capacity) and starves
    downstream stations once that buffer empties.
    """
    source = stations[source_idx]
    extra_seconds_per_cycle = source.baseline_cycle * degrade_severity
    affected = []
    cumulative_minutes = 0.0
    for j in range(source_idx + 1, min(source_idx + 5, len(stations))):
        station = stations[j]
        cycles_to_starve = max(1.0, station.buffer_capacity / max(degrade_severity, 0.05))
        minutes = (cycles_to_starve * station.baseline_cycle) / 60.0
        cumulative_minutes = minutes
        affected.append((station, round(cumulative_minutes, 1)))

    defect_like = degrade_severity > 0.12
    exposed_count = 0
    exposed_range = (vehicles_seen, vehicles_seen)
    if defect_like:
        # vehicles built during the ramp-up window are the exposed batch
        exposed_count = int(RNG.integers(6, 14))
        exposed_range = (vehicles_seen - exposed_count, vehicles_seen)

    return PropagationForecast(
        source=source,
        affected=affected,
        exposed_vehicle_range=exposed_range,
        exposed_count=exposed_count,
    )


@dataclass
class Recommendation:
    headline: str
    action: str
    confidence_label: str
    confidence_value: float


def recommend(result: StationResult, forecast: PropagationForecast) -> Recommendation:
    conf = result.confidence
    conf_label = "High" if conf > 0.85 else "Medium" if conf > 0.6 else "Low — vision/manual-inferred"

    next_hit = forecast.affected[0] if forecast.affected else None
    headline = f"{forecast.source.name} is degrading"
    if next_hit:
        headline += f" → {next_hit[0].name} may be affected in ~{next_hit[1]} min"
    if forecast.exposed_count:
        headline += f" → {forecast.exposed_count} vehicles potentially exposed"

    if result.anomaly_score > 0.8:
        action = f"Inspect {forecast.source.name} now; hold buffer before {next_hit[0].name if next_hit else 'downstream station'}."
    elif result.anomaly_score > 0.62:
        action = f"Schedule inspection of {forecast.source.name} within this shift; monitor downstream buffer."
    else:
        action = "Continue monitoring — no action required yet."

    return Recommendation(headline=headline, action=action, confidence_label=conf_label, confidence_value=conf)


def run_scenario(cfg: LineConfig | None = None, source_idx: int | None = None,
                  degrade_severity: float = 0.22, vehicles_seen: int = 4040,
                  stations: list[Station] | None = None):
    """
    End-to-end SEE -> MODEL -> PREDICT -> ACT run. Returns a dict of results for the UI/CLI.

    Pass `stations` (from an earlier build_line() or run_scenario() call) to re-run a
    scenario on the SAME line topology/tiers - otherwise a fresh random line is built
    each call, and a station index from one run will not refer to the same tier in another.
    """
    cfg = cfg or LineConfig()
    stations = stations or build_line(cfg)
    if source_idx is None:
        # bias toward a mid-line station so propagation has room downstream
        source_idx = int(len(stations) * 0.35)

    n_windows = cfg.history_windows + 60
    results: dict[int, StationResult] = {}
    all_features: dict[int, np.ndarray] = {}

    for i, station in enumerate(stations):
        degrade_from = cfg.history_windows if i == source_idx else None
        feats = simulate_station_features(station, n_windows, degrade_from, degrade_severity)
        all_features[i] = feats
        results[i] = fit_and_score(station, feats, cfg.history_windows)

    forecast = propagate(stations, results, source_idx, degrade_severity, vehicles_seen)
    rec = recommend(results[source_idx], forecast)

    return {
        "config": cfg,
        "stations": stations,
        "results": results,
        "features": all_features,
        "source_idx": source_idx,
        "forecast": forecast,
        "recommendation": rec,
    }


if __name__ == "__main__":
    out = run_scenario()
    stations = out["stations"]
    results = out["results"]
    src = out["source_idx"]

    tier_counts = {t: sum(1 for s in stations if s.tier == t) for t in (TIER_A, TIER_B, TIER_C)}
    print(f"Line: {len(stations)} stations  |  Tier A(instrumented)={tier_counts[TIER_A]}  "
          f"Tier B(vision)={tier_counts[TIER_B]}  Tier C(manual)={tier_counts[TIER_C]}")
    print(f"Injected degradation at: {stations[src].name}  (tier={stations[src].tier})\n")

    print("Per-station anomaly scan (flagged only):")
    for i, r in results.items():
        if r.is_flagged:
            print(f"  {r.station.name:6s} tier={r.station.tier:12s} score={r.anomaly_score:.2f} "
                  f"confidence={r.confidence:.2f} {'<-- SOURCE' if i == src else ''}")

    fc = out["forecast"]
    print(f"\nPropagation forecast from {fc.source.name}:")
    for station, minutes in fc.affected:
        print(f"  -> {station.name} affected in ~{minutes} min")
    print(f"  Exposed vehicles: {fc.exposed_vehicle_range[0]}-{fc.exposed_vehicle_range[1]} "
          f"({fc.exposed_count} units)")

    rec = out["recommendation"]
    print(f"\nRecommendation:\n  {rec.headline}\n  Action: {rec.action}\n  "
          f"Confidence: {rec.confidence_label} ({rec.confidence_value:.2f})")
