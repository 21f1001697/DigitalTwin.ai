"use client";
import React, { useState, useEffect } from "react";
import { STATIONS } from "@/lib/data";
import { Station } from "@/lib/types";
import { StationDrawer } from "@/components/station/StationDrawer";
import { HealthStatusDot } from "@/components/shared/HealthStatusDot";
import { Play, Pause, AlertTriangle } from "lucide-react";

export function FactoryFlowCanvas() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);
  const [activeFrame, setActiveFrame] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFrame((prev) => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-120px)] bg-[#f8fafc] text-slate-800 flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* Background Ambience Grid Texture */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,rgba(6,182,212,0.04)_40%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Top Bar with Single Control: Live | Replay Toggle */}
      <div className="relative z-30 px-6 py-3.5 flex items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold tracking-wider text-indigo-700 uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            Interactive Factory Flow Canvas
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            • Real-time unit transit & defect propagation across 20 nodes
          </span>
        </div>

        {/* Live | Replay Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-mono">
          <button
            onClick={() => setIsLiveMode(true)}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              isLiveMode ? "bg-white text-indigo-600 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Live Telemetry
          </button>
          <button
            onClick={() => setIsLiveMode(false)}
            className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              !isLiveMode ? "bg-amber-100 text-amber-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Replay Buffer
          </button>
        </div>
      </div>

      {/* Main Isometric Production Line */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 min-h-[620px]">
        <div className="relative w-full max-w-6xl h-[520px] bg-white rounded-3xl border border-slate-200 p-8 flex flex-col justify-between shadow-xs">
          
          {/* Legend Strip */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 uppercase text-[9px]">Unit Risk:</span>
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 border border-slate-400" /> Nominal Unit
              </span>
              <span className="flex items-center gap-1.5 text-amber-700 font-bold">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
                Undetected Defect Risk
              </span>
            </div>

            <div className="flex items-center gap-2 text-rose-600 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>ST-10 Bottleneck & Fluid Surge</span>
            </div>
          </div>

          {/* S-Curve Conveyor Visual Flow across 3 Zones */}
          <div className="relative flex-1 flex flex-col justify-around py-4">
            
            {/* ROW 1: Body Construction (ST01 - ST06) */}
            <div className="relative">
              <div className="absolute -top-3 left-0 text-[10px] font-mono font-bold text-cyan-800 tracking-wider">
                ZONE 1: BODY CONSTRUCTION
              </div>
              <div className="h-16 rounded-2xl bg-slate-50 border border-cyan-300/60 flex items-center justify-between px-6 relative overflow-hidden">
                {/* Conveyor Track Line */}
                <div className="absolute inset-x-0 h-1.5 bg-slate-200" />
                
                {/* Moving Unit */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-9 h-5 rounded-md bg-white border border-slate-400 shadow-md flex items-center justify-center transition-all duration-100"
                  style={{ left: `${(activeFrame * 1.8) % 90}%` }}
                >
                  <div className="w-5 h-2 bg-slate-800 rounded-xs" />
                </div>

                {/* Stations 1 to 6 */}
                {STATIONS.slice(0, 6).map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStation(st)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs shadow-xs transition-all group-hover:scale-110 ${
                      st.health === "critical"
                        ? "border-rose-500 bg-rose-50 text-rose-950"
                        : st.health === "warning"
                        ? "border-amber-500 bg-amber-50 text-amber-950"
                        : "border-cyan-500 bg-white text-slate-900"
                    }`}>
                      <span>#{st.stationNumber < 10 ? `0${st.stationNumber}` : st.stationNumber}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 max-w-[80px] truncate group-hover:text-slate-900 font-bold">
                      {st.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 2: Paint Zone (ST07 - ST13) */}
            <div className="relative">
              <div className="absolute -top-3 left-0 text-[10px] font-mono font-bold text-amber-800 tracking-wider">
                ZONE 2: PAINT (DEFECT PROPAGATION OCCURRING)
              </div>
              <div className="h-16 rounded-2xl bg-slate-50 border border-amber-300/60 flex items-center justify-between px-6 relative overflow-hidden">
                <div className="absolute inset-x-0 h-1.5 bg-slate-200" />
                
                {/* Defect Carrying Unit glowing Amber */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-10 h-6 rounded-md bg-amber-400 border border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.9)] flex items-center justify-center transition-all duration-100 animate-pulse"
                  style={{ left: `${40 + ((activeFrame * 0.8) % 45)}%` }}
                >
                  <div className="w-5 h-2 bg-slate-950 rounded-xs" />
                </div>

                {/* Queue Stacking at ST-10 Bottleneck */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[48%] flex gap-1 pointer-events-none">
                  <div className="w-7 h-4 rounded-xs bg-slate-300 border border-slate-400 opacity-70" />
                  <div className="w-7 h-4 rounded-xs bg-amber-400 border border-amber-500 shadow-sm" />
                </div>

                {/* Stations 7 to 13 */}
                {STATIONS.slice(6, 13).map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStation(st)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs shadow-xs transition-all group-hover:scale-110 ${
                      st.health === "critical"
                        ? "border-rose-500 bg-rose-50 text-rose-950 ring-4 ring-rose-300 animate-pulse"
                        : st.health === "warning"
                        ? "border-amber-500 bg-amber-50 text-amber-950"
                        : "border-amber-500/80 bg-white text-slate-900"
                    }`}>
                      <span>#{st.stationNumber < 10 ? `0${st.stationNumber}` : st.stationNumber}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 max-w-[80px] truncate group-hover:text-slate-900 font-bold">
                      {st.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ROW 3: Final Assembly (ST14 - ST20) */}
            <div className="relative">
              <div className="absolute -top-3 left-0 text-[10px] font-mono font-bold text-purple-800 tracking-wider">
                ZONE 3: FINAL ASSEMBLY
              </div>
              <div className="h-16 rounded-2xl bg-slate-50 border border-purple-300/60 flex items-center justify-between px-6 relative overflow-hidden">
                <div className="absolute inset-x-0 h-1.5 bg-slate-200" />

                {/* Stations 14 to 20 */}
                {STATIONS.slice(13, 20).map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStation(st)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer"
                  >
                    <div className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-mono font-bold text-xs shadow-xs transition-all group-hover:scale-110 ${
                      st.health === "critical"
                        ? "border-rose-500 bg-rose-50 text-rose-950"
                        : st.health === "warning"
                        ? "border-amber-500 bg-amber-50 text-amber-950"
                        : "border-purple-500 bg-white text-slate-900"
                    }`}>
                      <span>#{st.stationNumber < 10 ? `0${st.stationNumber}` : st.stationNumber}</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 mt-1 max-w-[80px] truncate group-hover:text-slate-900 font-bold">
                      {st.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Callout */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] font-mono">
            <span className="text-slate-500">
              💡 Tap any station node to open the live Station Detail drawer and inspect sensor parameters.
            </span>
            <span className="text-indigo-600 font-bold">
              Line Pace: 54 JPH (Jobs Per Hour)
            </span>
          </div>
        </div>
      </div>

      {/* Shared Station Detail Drawer */}
      {selectedStation && (
        <StationDrawer
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
          onSelectStation={(id) => {
            const st = STATIONS.find((s) => s.id === id);
            if (st) setSelectedStation(st);
          }}
        />
      )}
    </div>
  );
}