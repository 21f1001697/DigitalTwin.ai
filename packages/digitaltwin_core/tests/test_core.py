from digitaltwin_core import run_scenario, build_line, LineConfig, TIER_A, TIER_C


def test_run_scenario_end_to_end():
    out = run_scenario()
    assert "recommendation" in out
    assert "forecast" in out
    assert 0.0 <= out["results"][out["source_idx"]].anomaly_score <= 1.0


def test_line_has_all_three_tiers():
    cfg = LineConfig(n_stations=40)
    stations = build_line(cfg)
    tiers = {s.tier for s in stations}
    assert TIER_A in tiers
    assert TIER_C in tiers


def test_tier_a_source_is_flagged():
    cfg = LineConfig(n_stations=40)
    stations = build_line(cfg)
    tier_a_idx = next(i for i, s in enumerate(stations) if s.tier == TIER_A)
    out = run_scenario(cfg=cfg, stations=stations, source_idx=tier_a_idx, degrade_severity=0.22)
    result = out["results"][tier_a_idx]
    assert result.is_flagged
    assert result.confidence > 0.9
