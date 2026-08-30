"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Eye, Cpu, Search, CheckCircle2, ShieldCheck, Zap, Box } from "lucide-react";
import { HelixChronoMatrix } from "@/components/ui/helix-chrono-matrix";

export default function LandingPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* Background Ambience Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,rgba(6,182,212,0.04)_40%,transparent_70%)] pointer-events-none blur-3xl z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px] opacity-40 pointer-events-none z-10" />

      {/* Top Ambient Navigation Header */}
      <header className="relative z-30 w-full px-6 sm:px-12 py-4 flex items-center justify-between bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Box className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-baseline font-black tracking-wider text-lg font-mono text-slate-900">
            <span>VANTAGE</span>
            <span className="text-indigo-600">.AI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-mono font-bold shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase text-[10px]">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* MAIN FULL-SCREEN HERO: 3D Helix Chrono Matrix with Center "Vantage.AI" Stencil */}
      <main className="relative z-20 w-full flex-1 flex flex-col items-center justify-center min-h-[580px]">
        <div className="relative w-full h-[65vh] min-h-[500px]">
          <HelixChronoMatrix
            themeBg="#f8fafc"
            className="w-full h-full"
          >
            {/* Center Overlay: "Vantage.AI" + Sub-line + Primary CTA Button */}
            <div className="flex flex-col items-center justify-center text-center space-y-4 pointer-events-auto px-4">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700 shadow-2xs backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                PRODUCTION DIGITAL TWIN
              </div>

              {/* Center Stencil Title: Vantage.AI */}
              <h1 className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-slate-900 drop-shadow-sm select-none">
                Vantage.AI
              </h1>

              {/* Subline */}
              <p className="text-xs sm:text-sm font-mono font-bold text-slate-600 max-w-xl mx-auto bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl border border-slate-200 shadow-xs">
                From live telemetry to human-approved action — in one loop.
              </p>

              {/* Primary CTA Button */}
              <div className="pt-2">
                <Link
                  href="/twin/orbit"
                  className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-95 font-mono"
                >
                  <span>Enter Twin</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </HelixChronoMatrix>
        </div>
      </main>

      {/* BELOW HERO FOOTER: 3 Stat Chips + 4-Step Visual Strip */}
      <footer className="relative z-30 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 border-t border-slate-200/90 bg-white/80 backdrop-blur-md rounded-t-3xl shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 3 Stat Chips */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-slate-900 font-black">20 Stations</span>
            <span className="text-slate-500 font-sans">• 3 Production Zones</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-slate-900 font-black">70% Sensor Coverage</span>
            <span className="text-slate-500 font-sans">(14 Full · 3 Partial · 3 Manual)</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-slate-900 font-black">99.2% Accuracy</span>
            <span className="text-slate-500 font-sans">Prediction Confidence</span>
          </div>
        </div>

        {/* 4-Step Visual Strip: SEE → PREDICT → ANALYZE → ACT */}
        <div className="flex items-center gap-2 text-xs font-mono font-black tracking-wider">
          <div className="flex items-center gap-1.5 text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200">
            <Eye className="w-3.5 h-3.5" />
            <span>SEE</span>
          </div>
          <span className="text-slate-300">→</span>

          <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
            <Cpu className="w-3.5 h-3.5" />
            <span>PREDICT</span>
          </div>
          <span className="text-slate-300">→</span>

          <div className="flex items-center gap-1.5 text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
            <Search className="w-3.5 h-3.5" />
            <span>ANALYZE</span>
          </div>
          <span className="text-slate-300">→</span>

          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ACT</span>
          </div>
        </div>
      </footer>
    </div>
  );
}