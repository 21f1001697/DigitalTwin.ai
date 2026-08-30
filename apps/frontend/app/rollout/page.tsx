"use client";
import React from "react";
import Link from "next/link";
import { TopNav } from "@/components/nav/TopNav";
import { 
  ArrowRight, CheckCircle2, Globe, Factory, Layers, 
  TrendingUp, ShieldCheck, DollarSign, Clock, Cpu, FileText 
} from "lucide-react";

export default function RolloutPage() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Line 1 Digital Twin Prototype",
      status: "Current Active",
      badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-300",
      description: "20 synchronized stations across Body, Paint, and Final Assembly with live telemetry and human-in-the-loop actions.",
      requirements: "Edge gateway deployed, 14 full + 3 partial sensor feeds ingested."
    },
    {
      phase: "Phase 2",
      title: "Full Plant Enterprise Scale",
      status: "Next Horizon",
      badgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
      description: "Rollout across all 4 production lines (80 total stations) with cross-line defect correlation and unified action queue.",
      requirements: "Plant-wide MQTT broker, ERP maintenance dispatch integration."
    },
    {
      phase: "Phase 3",
      title: "Multi-Site Global Mesh",
      status: "Target Vision",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-300",
      description: "Federated digital twin models trained across 3 global manufacturing plants with automated baseline benchmarking.",
      requirements: "Cross-plant privacy-preserving model synchronization."
    }
  ];

  const adaptationCards = [
    {
      title: "Different Line Layouts",
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      description: "Graph-neural topological modeling dynamically ingests any conveyor layout without custom code rewrites."
    },
    {
      title: "Different Equipment Vintage",
      icon: <Factory className="w-5 h-5 text-cyan-600" />,
      description: "Interfaces seamlessly with 20-year legacy PLCs via non-invasive current/vibration sensors and modern OPC-UA."
    },
    {
      title: "Different Sensor Maturity",
      icon: <Cpu className="w-5 h-5 text-purple-600" />,
      description: "Applies our 3-tier instrumentation framework (Full/Partial/Manual) to maintain high predictive utility despite sensor gaps."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <TopNav />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 space-y-10 flex-1">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            ENTERPRISE SCALABILITY & MULTI-PLANT EXPANSION
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Rollout Architecture Beyond a Single Line
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Designed from day one to scale horizontally across lines, plants, and varying machine vintages without custom engineering overhauls.
          </p>
        </div>

        {/* PRIMARY: The Phased Roadmap Timeline */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-6">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            Phased Implementation Roadmap
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-slate-900">{item.phase}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${item.badgeClass}`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 font-sans">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 font-mono text-[11px] text-slate-500">
                  <strong className="text-slate-700 block text-[10px] uppercase">Infrastructure Needed:</strong>
                  <span>{item.requirements}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECONDARY: Generalization Story (3 Bullet Cards) */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
            How the Twin Adapts to Heterogeneous Environments
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adaptationCards.map((card, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  {card.icon}
                </div>
                <h4 className="font-black text-sm text-slate-900 font-sans">{card.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs font-mono text-indigo-900 flex items-center justify-between">
            <span>
              💡 <strong>Unified Sensor Tiering:</strong> The exact same 3-tier instrumentation methodology (Full / Partial / Manual) applies to any greenfield or brownfield line.
            </span>
            <Link href="/sensor-coverage" className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 shrink-0 ml-4">
              <span>View Sensor Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TERTIARY: Lightweight ROI Teaser */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Projected Economic Impact (Prototype Baseline)
            </span>
            <h3 className="text-xl font-black text-white">
              Measurable Scrap Avoidance & Yield Optimization
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Illustrative metrics based on 54 JPH automotive assembly line prototype assumptions.
            </p>
          </div>

          <div className="flex items-center gap-6 text-center">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl min-w-[120px]">
              <span className="text-2xl font-black font-mono text-cyan-400 block">42%</span>
              <span className="text-[10px] text-slate-400 font-mono">Defect Reduction</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl min-w-[120px]">
              <span className="text-2xl font-black font-mono text-emerald-400 block">$1.8M</span>
              <span className="text-[10px] text-slate-400 font-mono">Annual Avoidance</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl min-w-[120px]">
              <span className="text-2xl font-black font-mono text-indigo-400 block">3.4x</span>
              <span className="text-[10px] text-slate-400 font-mono">Faster Triage</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}