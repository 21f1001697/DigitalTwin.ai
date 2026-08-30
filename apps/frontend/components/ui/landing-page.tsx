"use client";
import React from "react";
import { ArrowRight, Eye, Cpu, Search, CheckCircle2, ShieldCheck, Zap, Activity, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface LandingPageProps {
  onEnterTwin: (defaultTab?: "factory-scene" | "stations-orbit" | "timeline") => void;
}

export default function LandingPage({ onEnterTwin }: LandingPageProps) {
  return (
    <div className="relative w-full min-h-screen bg-[#070b19] text-slate-100 flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* Background Navy/Purple Orbit Palette with Faint Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#070b19] to-[#04060e] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,rgba(99,102,241,0.06)_40%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      {/* Top Ambient Navigation Header */}
      <header className="relative z-30 w-full px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 p-0.5 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            <div className="w-full h-full bg-[#070b19] rounded-[10px] flex items-center justify-center">
              <Box className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div className="flex items-baseline font-black tracking-wider text-lg font-mono text-white">
            <span>DIGITALTWIN</span>
            <span className="text-cyan-400">.AI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-emerald-400 text-xs font-mono font-semibold backdrop-blur-md shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="tracking-wider uppercase text-[10px]">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* HERO (Full-bleed interactive assembly line visual + copy) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 flex-1 flex flex-col justify-center py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 w-fit backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              PRODUCTION DIGITAL TWIN
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                See problems <br />
                <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  before they happen
                </span>{" "}
                on your line
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md pt-1">
                From live telemetry to human-approved action — in one loop.
              </p>
            </div>

            {/* Primary CTA Button (Cyan-Blue Accent) */}
            <div className="pt-3">
              <button
                onClick={() => onEnterTwin("factory-scene")}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
              >
                <span>Enter Twin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Mini Interactive Assembly-Line Animation */}
          <div className="lg:col-span-7 relative w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden bg-slate-950/70 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.15)] group">
            
            {/* Faint Grid Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Ambient Top Scan Bar */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2 bg-slate-950/60 backdrop-blur-md border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                TELEMETRY PREVIEW • LIVE STREAM
              </span>
              <span className="text-slate-500">20 NODES SYNCHRONIZED</span>
            </div>

            {/* Conveyor Loop SVG Track */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 360" preserveAspectRatio="none">
              <path
                d="M 60,250 C 140,160 460,160 540,250 C 460,340 140,340 60,250 Z"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="42"
              />
              <path
                d="M 60,250 C 140,160 460,160 540,250 C 460,340 140,340 60,250 Z"
                fill="none"
                stroke="#1e293b"
                strokeWidth="32"
              />
              <path
                d="M 60,250 C 140,160 460,160 540,250 C 460,340 140,340 60,250 Z"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="8,6"
                className="animate-[dash_1.5s_linear_infinite]"
                opacity="0.7"
              />
            </svg>

            {/* Station Preview Nodes with Live 🟢 🟠 🔴 Health Glows */}
            
            {/* ST-01 (Body Construction - 🟢 Online) */}
            <div className="absolute top-[35%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/node pointer-events-none">
              <div className="relative w-8 h-8 rounded-full border-2 border-cyan-400 bg-slate-900 flex items-center justify-center font-mono font-bold text-[9px] text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
                <span>01</span>
              </div>
              <span className="text-[8px] font-mono text-cyan-300 mt-1">ST-01</span>
            </div>

            {/* ST-03 (Body Construction - 🟠 Warning) */}
            <div className="absolute top-[32%] left-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="relative w-8 h-8 rounded-full border-2 border-cyan-400 bg-amber-950/80 flex items-center justify-center font-mono font-bold text-[9px] text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-pulse">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>03</span>
              </div>
              <span className="text-[8px] font-mono text-amber-300 mt-1 font-bold">ST-03 ⚠️</span>
            </div>

            {/* ST-07 (Paint - 🟢 Online) */}
            <div className="absolute top-[40%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="relative w-8 h-8 rounded-full border-2 border-amber-400 bg-slate-900 flex items-center justify-center font-mono font-bold text-[9px] text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400" />
                <span>07</span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 mt-1">ST-07</span>
            </div>

            {/* ST-10 (Paint - 🔴 Critical) */}
            <div className="absolute top-[68%] left-[72%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="relative w-9 h-9 rounded-full border-2 border-amber-400 bg-rose-950 flex items-center justify-center font-mono font-black text-[10px] text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.8)] animate-pulse">
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>10</span>
              </div>
              <span className="text-[8px] font-mono text-rose-400 mt-1 font-extrabold">ST-10 🔴</span>
            </div>

            {/* ST-16 (Final Assembly - 🟠 Warning) */}
            <div className="absolute top-[72%] left-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="relative w-8 h-8 rounded-full border-2 border-purple-400 bg-amber-950/80 flex items-center justify-center font-mono font-bold text-[9px] text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400" />
                <span>16</span>
              </div>
              <span className="text-[8px] font-mono text-amber-300 mt-1">ST-16</span>
            </div>

            {/* ST-20 (Final Assembly - 🟢 Online) */}
            <div className="absolute top-[62%] left-[16%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="relative w-8 h-8 rounded-full border-2 border-purple-400 bg-slate-900 flex items-center justify-center font-mono font-bold text-[9px] text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400" />
                <span>20</span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 mt-1">ST-20</span>
            </div>

            {/* Moving Ambient Units along the Conveyor Loop */}
            <div className="absolute top-[65%] left-[25%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-[ambientCar1_10s_linear_infinite]">
              <div className="w-14 h-7 rounded-lg bg-gradient-to-r from-slate-200 to-white shadow-lg border border-slate-400 flex items-center justify-center">
                <div className="w-8 h-3 bg-slate-900 rounded-sm" />
              </div>
            </div>

            <div className="absolute top-[68%] left-[68%] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-[ambientCar2_10s_linear_infinite]">
              <div className="w-14 h-7 rounded-lg bg-gradient-to-r from-slate-300 to-slate-100 shadow-lg border border-slate-400 flex items-center justify-center">
                <div className="w-8 h-3 bg-slate-900 rounded-sm" />
              </div>
            </div>

            {/* Bottom Overlay Hint */}
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] font-mono text-cyan-300/80 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">
                Click "Enter Twin" to inspect live sensors, station telemetry & orbit
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* BELOW HERO SECTION: 3 Stat Chips + 4-Step Visual Strip */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* 3 Stat Chips */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <div className="bg-slate-900/80 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-white font-bold">20 Stations</span>
            <span className="text-slate-500 font-sans">• 3 Production Zones</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-white font-bold">70% Fully Instrumented</span>
            <span className="text-slate-500 font-sans">(14 Full · 3 Partial · 3 Manual)</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-white font-bold">99.2% Accuracy</span>
            <span className="text-slate-500 font-sans">Prediction Confidence</span>
          </div>
        </div>

        {/* 4-Step Visual Strip: SEE → PREDICT → ANALYZE → ACT */}
        <div className="flex items-center gap-2 text-xs font-mono font-extrabold tracking-wider">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Eye className="w-3.5 h-3.5" />
            <span>SEE</span>
          </div>
          <span className="text-slate-600">→</span>

          <div className="flex items-center gap-1.5 text-indigo-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>PREDICT</span>
          </div>
          <span className="text-slate-600">→</span>

          <div className="flex items-center gap-1.5 text-purple-400">
            <Search className="w-3.5 h-3.5" />
            <span>ANALYZE</span>
          </div>
          <span className="text-slate-600">→</span>

          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>ACT</span>
          </div>
        </div>
      </footer>

      {/* Ambient Moving Unit Animation Keyframes */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -28;
          }
        }

        @keyframes ambientCar1 {
          0% {
            top: 65%;
            left: 25%;
            transform: scale(0.9) rotate(-10deg);
          }
          40% {
            top: 68%;
            left: 55%;
            transform: scale(1) rotate(0deg);
          }
          70% {
            top: 72%;
            left: 78%;
            transform: scale(0.9) rotate(15deg);
          }
          85% {
            top: 45%;
            left: 70%;
            transform: scale(0.75) rotate(180deg);
          }
          100% {
            top: 65%;
            left: 25%;
            transform: scale(0.9) rotate(-10deg);
          }
        }

        @keyframes ambientCar2 {
          0% {
            top: 72%;
            left: 78%;
            transform: scale(0.9) rotate(15deg);
          }
          25% {
            top: 45%;
            left: 70%;
            transform: scale(0.75) rotate(180deg);
          }
          60% {
            top: 45%;
            left: 30%;
            transform: scale(0.75) rotate(190deg);
          }
          80% {
            top: 65%;
            left: 25%;
            transform: scale(0.9) rotate(-10deg);
          }
          100% {
            top: 72%;
            left: 78%;
            transform: scale(0.9) rotate(15deg);
          }
        }
      `}</style>
    </div>
  );
}