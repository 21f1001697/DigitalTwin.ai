"""
DigitalTwin.ai — working prototype dashboard.

Flask app demonstrating the core mechanism end-to-end on a simulated
30-50 station mixed-model line with uneven sensor coverage. Two scenarios
are pre-computed on page load (same line topology, different source station
tier) to make the "visibility gap" concrete: identical degradation severity,
very different detectability, depending on what's actually watching that
station.
"""

import io
import base64
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from flask import Flask, render_template

from digitaltwin_core import (
    run_scenario, build_line, LineConfig, TIER_A, TIER_B, TIER_C
)

app = Flask(__name__)

TIER_LABEL = {TIER_A: "Instrumented", TIER_B: "Vision", TIER_C: "Manual"}
TIER_COLOR = {TIER_A: "#DCEAEA", TIER_B: "#F5E2D3", TIER_C: "#E7E2EC"}


def fig_to_base64(fig) -> str:
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=140, bbox_inches="tight", facecolor="none", transparent=True)
    plt.close(fig)
    return base64.b64encode(buf.getvalue()).decode("ascii")


def render_timeline_chart(result, history_windows: int) -> str:
    scores = result.scores_over_time
    fig, ax = plt.subplots(figsize=(6.4, 2.1))
    x = range(len(scores))
    ax.plot(x, scores, color="#C4622D", linewidth=1.8)
    ax.axhline(0.62, color="#B3402F", linestyle="--", linewidth=1, alpha=0.7)
    ax.axvline(history_windows, color="#6B7684", linestyle=":", linewidth=1, alpha=0.8)
    ax.fill_between(x, 0, scores, color="#C4622D", alpha=0.12)
    ax.set_ylim(0, 1)
    ax.set_xlim(0, len(scores))
    ax.set_yticks([0, 0.5, 1.0])
    ax.set_xlabel("1-second window", fontsize=9, color="#3A4552")
    ax.set_ylabel("anomaly score", fontsize=9, color="#3A4552")
    ax.tick_params(labelsize=8, colors="#6B7684")
    for spine in ("top", "right"):
        ax.spines[spine].set_visible(False)
    for spine in ("left", "bottom"):
        ax.spines[spine].set_color("#CBD2D9")
    fig.tight_layout()
    return fig_to_base64(fig)


def build_station_strip(stations, results, source_idx, window=6):
    """A small window of stations around the source, for the line-map view."""
    lo = max(0, source_idx - 2)
    hi = min(len(stations), source_idx + window - 2)
    strip = []
    for i in range(lo, hi):
        st = stations[i]
        r = results[i]
        state = "source" if i == source_idx else ("watch" if r.anomaly_score > 0.55 else "ok")
        strip.append({
            "name": st.name,
            "tier": TIER_LABEL[st.tier],
            "tier_key": st.tier,
            "state": state,
            "score": round(r.anomaly_score, 2),
        })
    return strip


def scenario_payload(cfg, stations, source_idx, degrade_severity):
    out = run_scenario(cfg=cfg, stations=stations, source_idx=source_idx, degrade_severity=degrade_severity)
    result = out["results"][source_idx]
    forecast = out["forecast"]
    rec = out["recommendation"]

    return {
        "station": stations[source_idx].name,
        "tier": TIER_LABEL[stations[source_idx].tier],
        "tier_key": stations[source_idx].tier,
        "score": round(result.anomaly_score, 2),
        "flagged": result.is_flagged,
        "confidence_pct": round(result.confidence * 100),
        "confidence_label": rec.confidence_label,
        "chart": render_timeline_chart(result, cfg.history_windows),
        "affected": [{"name": s.name, "minutes": m} for s, m in forecast.affected],
        "exposed_range": forecast.exposed_vehicle_range,
        "exposed_count": forecast.exposed_count,
        "headline": rec.headline,
        "action": rec.action,
        "strip": build_station_strip(stations, out["results"], source_idx),
    }


@app.route("/")
def index():
    cfg = LineConfig(n_stations=40)
    stations = build_line(cfg)

    tier_a_idx = next(i for i, s in enumerate(stations) if s.tier == TIER_A)
    tier_c_idx = next(i for i, s in enumerate(stations) if s.tier == TIER_C)

    severity = 0.22
    scenario_a = scenario_payload(cfg, stations, tier_a_idx, severity)
    scenario_c = scenario_payload(cfg, stations, tier_c_idx, severity)

    tier_counts = {
        TIER_LABEL[TIER_A]: sum(1 for s in stations if s.tier == TIER_A),
        TIER_LABEL[TIER_B]: sum(1 for s in stations if s.tier == TIER_B),
        TIER_LABEL[TIER_C]: sum(1 for s in stations if s.tier == TIER_C),
    }

    return render_template(
        "index.html",
        n_stations=len(stations),
        tier_counts=tier_counts,
        scenario_a=scenario_a,
        scenario_c=scenario_c,
        severity_pct=int(severity * 100),
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5055, debug=True)
