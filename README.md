# DigitalTwin.ai

A live, tier-aware digital twin of a mixed-model vehicle assembly line — fusing PLC
telemetry, vision-inferred signals, and manual-checklist data across uneven sensor
coverage — that predicts bottlenecks and defect exposure before either happens.

Team CUBIX — IIT Madras. Accenture Innovation Challenge 2026, Round 2.

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
