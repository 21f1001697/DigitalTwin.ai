"use client";
import React, { useState } from "react";
import { TopNav } from "@/components/nav/TopNav";
import { STATIONS } from "@/lib/data";
import { Station, InstrumentationLevel } from "@/lib/types";
import { InstrumentationBadge } from "@/components/station/InstrumentationBadge";
import { Zap, Activity, FileText, CheckCircle2, Clock, Sparkles, PlusCircle, ArrowRight, X } from "lucide-react";

export default function SensorCoveragePage() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(STATIONS[3]); // ST-04 default partial
  const [filterLevel, setFilterLevel] = useState<InstrumentationLevel | "All">("All");

  const fullCount = STATIONS.filter((s) => s.instrumentation === "Full").length;
  const partialCount = STATIONS.filter((s) => s.instrumentation === "Partial").length;
  const manualCount = STATIONS.filter((s) => s.instrumentation === "Manual").length;

  const filteredStations = filterLevel === "All"
    ? STATIONS
    : STATIONS.filter((s) => s.instrumentation === filterLevel);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <TopNav />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 space-y-8 flex-1">
        
        {/* Top Summary Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              OBSERVABILITY & SENSOR MATURITY MATRIX
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
              Physical Sensor Coverage & Inferred Twin States
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              <strong>{fullCount} of 20 stations fully instrumented</strong> · {partialCount} partial · {manualCount} manual-check only
            </p>
          </div>

          {/* Level Filter Chips */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-mono">
            <button
              onClick={() => setFilterLevel("All")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterLevel === "All" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All (20)
            </button>
            <button
              onClick={() => setFilterLevel("Full")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterLevel === "Full" ? "bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              ⚡ Full ({fullCount})
            </button>
            <button
              onClick={() => setFilterLevel("Partial")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterLevel === "Partial" ? "bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              🌓 Partial ({partialCount})
            </button>
            <button
              onClick={() => setFilterLevel("Manual")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                filterLevel === "Manual" ? "bg-slate-200 text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              📝 Manual ({manualCount})
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Grid Map + Station Observability Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Station Topology Grid Colored by Instrumentation Level */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Production Line Station Topology (Select Station to Inspect)
            </span>

            {/* 3 Zone Sections */}
            {(["Body Construction", "Paint", "Final Assembly"] as const).map((zoneName) => {
              const zoneStations = filteredStations.filter((s) => s.zone === zoneName);
              if (zoneStations.length === 0) return null;

              return (
                <div key={zoneName} className="space-y-2.5">
                  <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                    {zoneName} ({zoneStations.length})
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {zoneStations.map((station) => {
                      const isSelected = selectedStation?.id === station.id;

                      return (
                        <button
                          key={station.id}
                          onClick={() => setSelectedStation(station)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer hover:scale-102 ${
                            station.instrumentation === "Full"
                              ? "bg-indigo-50/40 border-indigo-200 hover:border-indigo-400"
                              : station.instrumentation === "Partial"
                              ? "bg-cyan-50/40 border-cyan-200 hover:border-cyan-400"
                              : "bg-slate-100/60 border-slate-300 hover:border-slate-400"
                          } ${isSelected ? "ring-2 ring-indigo-600 shadow-md scale-102" : ""}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-black text-slate-900">
                              #{station.stationNumber < 10 ? `0${station.stationNumber}` : station.stationNumber}
                            </span>
                            <InstrumentationBadge level={station.instrumentation} />
                          </div>

                          <span className="text-xs font-bold text-slate-800 mt-2 truncate font-sans">
                            {station.name}
                          </span>

                          <span className="text-[9px] font-mono text-slate-400 mt-1">
                            {station.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Per-Station Sensed vs Inferred Breakdown */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 sticky top-28">
            {selectedStation ? (
              <>
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black px-2 py-0.5 rounded-lg bg-slate-900 text-white">
                        #{selectedStation.stationNumber < 10 ? `0${selectedStation.stationNumber}` : selectedStation.stationNumber}
                      </span>
                      <h3 className="font-black text-base text-slate-900">{selectedStation.name}</h3>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 font-bold mt-1 block">
                      {selectedStation.zone} • CODE: {selectedStation.code}
                    </span>
                  </div>

                  <InstrumentationBadge level={selectedStation.instrumentation} />
                </div>

                {/* Sensed Channels */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Directly Sensed Physical Channels
                  </span>
                  <div className="space-y-1.5">
                    {selectedStation.sensedVsInferred?.sensed.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    )) || (
                      <span className="text-xs text-slate-400 italic">Operator manual checklist inputs only</span>
                    )}
                  </div>
                </div>

                {/* Inferred Twin Parameters */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    AI-Inferred Physics Parameters (Virtual Twin)
                  </span>
                  <div className="space-y-1.5">
                    {selectedStation.sensedVsInferred?.inferred.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-indigo-900 bg-indigo-50/60 p-2 rounded-lg border border-indigo-100">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proposed Low-Cost Sensing Addition for Partial/Manual */}
                {selectedStation.proposedSensorUpgrade && (
                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
                    <span className="font-mono text-[10px] font-black uppercase text-amber-800 flex items-center gap-1.5">
                      <PlusCircle className="w-3.5 h-3.5" /> Proposed Low-Cost Sensor Upgrade
                    </span>
                    <p className="font-mono text-[11px] leading-relaxed">
                      {selectedStation.proposedSensorUpgrade}
                    </p>
                  </div>
                )}

                {/* Maintenance Window Context */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Next Scheduled Retrofit Window:</span>
                  <strong className="text-slate-800">{selectedStation.nextMaintenance}</strong>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-slate-400 font-mono text-xs">
                Select a station on the left to inspect physical telemetry vs virtual inferred parameters.
              </div>
            )}
          </div>

        </div>

      </main>
    </div>
  );
}