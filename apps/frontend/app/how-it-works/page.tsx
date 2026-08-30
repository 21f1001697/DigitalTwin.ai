"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { 
  ArrowRight, CheckCircle2, Cpu, Eye, Search, ShieldCheck, 
  Layers, Radio, Activity, ChevronDown, ChevronUp, Sparkles, BookOpen 
} from "lucide-react";

export default function HowItWorksPage() {
  const [showValidationDetails, setShowValidationDetails] = useState<boolean>(true);

  const technicalStages = [
    {
      step: "01",
      name: "Sense",
      tag: "Ingestion",
      desc: "High-frequency telemetry (100 Hz vibration, torque, pressure) + operator tablet checklist ingestion per station.",
      tech: "MQTT / OPC-UA / Edge Broker"
    },
    {
      step: "02",
      name: "Detect",
      tag: "Statistical Anomaly",
      desc: "Dynamic statistical band anomaly detection filtering machine noise from genuine variance signals.",
      tech: "EWMA & Kalman Filtering"
    },
    {
      step: "03",
      name: "Digital Twin",
      tag: "Physics Modeling",
      desc: "Synchronized station-state model combining directly measured parameters with inferred physics variables.",
      tech: "State-Space Physics Twin"
    },
    {
      step: "04",
      name: "Forecast",
      tag: "Prediction",
      desc: "Predictive risk probability scoring and estimated time-to-failure (TTF) forecasting.",
      tech: "Temporal Graph Neural Nets"
    },
    {
      step: "05",
      name: "Trace + Recommend",
      tag: "Root Cause Diagnosis",
      desc: "Multi-cause probability ranking, downstream propagation tracing, and prescriptive action synthesis.",
      tech: "Causal Inference Engine"
    },
    {
      step: "06",
      name: "Human Approval",
      tag: "Closed-Loop Governance",
      desc: "No automated action executes without explicit plant supervisor sign-off, logging all decisions to an audit trail.",
      tech: "Human-in-the-Loop Gateway"
    }
  ];

  const loopMapping = [
    {
      uiStage: "SEE",
      uiSubtext: "Twin Explorer Canvas",
      color: "text-cyan-600 bg-cyan-50 border-cyan-200",
      mappedTech: "Sense + Detect + Digital Twin",
      explanation: "Live line topology with dual visual signaling (Zone borders + Health dots) and real-time transit."
    },
    {
      uiStage: "PREDICT",
      uiSubtext: "Insights → Predictions",
      color: "text-indigo-600 bg-indigo-50 border-indigo-200",
      mappedTech: "Forecast (Risk % & TTF)",
      explanation: "Proactive triage list ranking impending failure risks before quality escapes occur."
    },
    {
      uiStage: "ANALYZE",
      uiSubtext: "Defect Trace",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      mappedTech: "Trace + Recommend",
      explanation: "Complete propagation path tracing, multi-cause attribution, and sensor physical evidence."
    },
    {
      uiStage: "ACT",
      uiSubtext: "Insights → Actions",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      mappedTech: "Human Approval Queue",
      explanation: "One-click approval/dismissal interface ensuring zero unverified autonomous changes."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <TopNav />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 space-y-10 flex-1">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            TECHNICAL ARCHITECTURE & METHODOLOGY
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            How DigitalTwin.AI Works: End-to-End Pipeline
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            From raw microsecond edge sensor ingestion to human-approved shop floor action — structured across 6 rigorous technical stages.
          </p>
        </div>

        {/* PRIMARY: The 6-Stage Technical Pipeline */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            6-Stage Technical Pipeline Architecture
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {technicalStages.map((stage) => (
              <div
                key={stage.step}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                      STAGE {stage.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                      {stage.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 font-sans">
                    {stage.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 font-mono text-[10px] text-slate-500 flex items-center justify-between">
                  <span className="text-slate-400 uppercase">Core Stack:</span>
                  <strong className="text-slate-700">{stage.tech}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECONDARY: Mapping Technical Pipeline to the 4 UX Stages */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              UX Loop Mapping: 6 Technical Stages → 4 User Touchpoints
            </span>
            <h2 className="text-xl font-black text-slate-900">
              How the Deep Tech Collapses into an Intuitive Operational Loop
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {loopMapping.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black border ${item.color}`}>
                      {item.uiStage}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Step {idx + 1}</span>
                  </div>

                  <h4 className="font-black text-sm text-slate-900 font-sans">{item.uiSubtext}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.explanation}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 font-mono text-[10px] text-indigo-700 font-bold">
                  Mapped to: {item.mappedTech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TERTIARY: Model Validation & Sensor Gap Handling */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
          <button
            onClick={() => setShowValidationDetails(!showValidationDetails)}
            className="flex items-center justify-between w-full text-left cursor-pointer"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">
                Model Governance & False-Alarm Minimization
              </span>
              <h3 className="text-lg font-black text-white mt-1">
                How We Validate Predictions & Maintain Shop Floor Trust
              </h3>
            </div>
            {showValidationDetails ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {showValidationDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800 text-xs font-mono animate-in fade-in duration-200">
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-cyan-300 block flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> False-Alarm Elimination
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Every prediction threshold is tuned against 100+ historical batch runs. The system scores its own confidence (High/Med/Low) so operators only act on validated high-probability excursions.
                </p>
              </div>

              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="font-bold text-indigo-300 block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Physics-Informed Sensor Gap Filling
                </span>
                <p className="text-slate-300 leading-relaxed">
                  At sensor-poor stations (Manual/Partial), upstream and downstream pacing data coupled with physical thermal/pressure models infer unmeasured machine states with high mathematical accuracy.
                </p>
              </div>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}