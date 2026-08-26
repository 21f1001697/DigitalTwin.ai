# DigitalTwin.ai

A live, tier-aware digital twin of a mixed-model vehicle assembly line — fusing PLC
telemetry, vision-inferred signals, and manual-checklist data across uneven sensor
coverage — that predicts bottlenecks and defect exposure before either happens.

Team CUBIX — IIT Madras. Accenture Innovation Challenge 2026, Round 2.

**Tagline:** *See the Invisible. Predict the Impact.* — AI recommends, humans decide.

## Implementation approach

The brief's core problem: a bottleneck at one station ripples downstream, and an
early defect may go uncaught for dozens of vehicles — but not every station has the
same quality of sensor data. We answer this with a **SEE → MODEL → PREDICT → ACT**
pipeline built around a 3-tier station model:

1. **SEE** — every station is tagged by how it's instrumented:
   - **Tier A (Instrumented)** — direct PLC/MES telemetry (torque, vibration, temp). ~97% confidence.
   - **Tier B (Vision)** — camera-inferred cycle time / motion / rework, correlated against nearby Tier A stations. ~80% confidence.
   - **Tier C (Manual)** — pass/fail checklists plus inference from neighboring buffer behavior. ~45% confidence.
   Lower tiers deliberately generate noisier signals (not just lower confidence labels), so the model stays honest about what it can and can't see.
2. **MODEL** — a separate unsupervised **Isolation Forest** is fit per station on that
   station's own healthy-history window (no labelled fault data required), so each
   station is judged against its own baseline rather than a factory-wide norm.
3. **PREDICT** — a discrete-event-style forward pass estimates how a degrading
   station drains its downstream buffer, producing a time-to-impact and an
   exposed-vehicle count if the degradation looks defect-like.
4. **ACT** — every event becomes one ranked, explainable recommendation (never a
   bare score), e.g. *"Station 14 is degrading → Station 17 may be affected in
   ~4 min → 9 vehicles potentially exposed."* Confidence is always shown alongside
   the recommendation, and nothing is auto-executed — a human approves or dismisses.

## Solution architecture

```
apps/dashboard (Flask)  ──imports──▶  packages/digitaltwin_core (predictive engine)
      │                                     │
      │ renders                             ├─ build_line()      synthetic line + tier assignment
      ▼                                     ├─ per-station signal generation (tier-scaled noise)
  Tier-A vs Tier-C                          ├─ IsolationForest anomaly scoring (per station)
  side-by-side comparison,                  ├─ downstream buffer-drain propagation forecast
  station-strip map,                        └─ ranked, explainable recommendation output
  confidence pills,
  anomaly-score charts
```

`digitaltwin_core` is a standalone, installable package with no dependency on the
dashboard — the engine is the reusable IP; `apps/dashboard` is one consumer of it,
so future consumers (a real frontend, an API service) can depend on the same package
instead of vendoring a copy.

## Dependencies

- **`packages/digitaltwin_core`** (the engine): `numpy`, `scipy`, `scikit-learn` (Python ≥3.10)
- **`apps/dashboard`** (the demo UI): `flask`, `matplotlib`, `pandas`, plus `digitaltwin_core` itself (installed editable)
- Dev/test: `pytest`

Exact pinned versions are not enforced (prototype stage); see
[`packages/digitaltwin_core/pyproject.toml`](packages/digitaltwin_core/pyproject.toml)
and [`apps/dashboard/requirements.txt`](apps/dashboard/requirements.txt) for the
authoritative lists.

## Structure

- **`packages/digitaltwin_core/`** — the predictive engine: synthetic line generation
  with a 3-tier sensor model (instrumented / vision / manual), per-station unsupervised
  anomaly detection, downstream propagation forecasting, and ranked recommendations.
  Installable as a standalone package; every app in this repo depends on it rather than
  vendoring its own copy.
- **`apps/dashboard/`** — a Flask app demonstrating the core mechanism: the same
  degradation severity injected at an instrumented vs. a manual-checklist station,
  side by side, to make the "visibility gap" concrete.
- **`docs/`** — the Round 2 business proposal and full 17-section PRD, each as both
  `.html` (styled, for reading/publishing) and `.docx` (for sharing/editing).

## Running the dashboard

```bash
cd packages/digitaltwin_core && pip install -e . && cd ../..
cd apps/dashboard && pip install -r requirements.txt
python3 app.py
```

Then open `http://127.0.0.1:5055`.

## Running tests

```bash
cd packages/digitaltwin_core
pip install -e ".[dev]" 2>/dev/null || pip install -e . pytest
pytest
```
