"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ACTIVE_DEFECT_EVENT, STATIONS } from "@/lib/data";
import { ArrowRight, AlertTriangle, CheckCircle2, ChevronRight, HelpCircle, X } from "lucide-react";
import { HealthStatusDot } from "@/components/shared/HealthStatusDot";

export function NodeTimeline() {
  const event = ACTIVE_DEFECT_EVENT;
  const [selectedHop, setSelectedHop] = useState<{
    stationId: number;
    sensorSnapshot: string;
  } | null>(null);

  return (
    <div className="w-full min-h-[calc(100vh-120px)] bg-[#f8fafc] text-slate-800 p-6 sm:p-12 flex flex-col justify-between font-sans">
      
      {/* Top Header with "Why?" Link */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
              ACTIVE DEFECT TIMELINE
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">EVENT #{event.id}</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
            {event.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sequential historical passage of Unit #VIN-4082 across paint line stations
          </p>
        </div>

        {/* The "Why?" Link leading to Defect Trace */}
        <Link
          href={`/defect-trace/${event.id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-xs shadow-sm transition-all cursor-pointer hover:shadow-md"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Why is this happening? View Full Trace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Horizontal Chain View */}
      <div className="max-w-6xl mx-auto w-full my-auto py-12">
        <div className="relative flex items-center justify-between overflow-x-auto pb-6">
          
          {/* Background Connecting Line */}
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-slate-200 -translate-y-1/2 z-0" />

          {/* Render Timeline Hops */}
          {event.propagationPath.map((hop, idx) => {
            const station = STATIONS.find((s) => s.id === hop.stationId);
            if (!station) return null;

            const isOrigin = hop.stationId === event.originStationId;
            const isSelected = selectedHop?.stationId === hop.stationId;

            return (
              <div key={hop.stationId} className="relative z-10 flex flex-col items-center group">
                
                {/* Historical Node Button */}
                <button
                  onClick={() => setSelectedHop(hop)}
                  className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-mono font-bold border-2 transition-all cursor-pointer shadow-md group-hover:scale-110 ${
                    hop.health === "critical"
                      ? "bg-rose-50 border-rose-500 text-rose-950 ring-4 ring-rose-300 animate-pulse"
                      : hop.health === "warning"
                      ? "bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-200"
                      : "bg-white border-slate-300 text-slate-800 hover:border-indigo-400"
                  } ${isSelected ? "scale-125 ring-4 ring-indigo-500" : ""}`}
                >
                  <span className="text-xs font-black">
                    #{station.stationNumber < 10 ? `0${station.stationNumber}` : station.stationNumber}
                  </span>
                  <span className="text-[8px] opacity-70">
                    {hop.health === "critical" ? "🔴 ERR" : hop.health === "warning" ? "🟠 WARN" : "🟢 OK"}
                  </span>
                </button>

                {/* Station Name & Hop Tag */}
                <div className="text-center mt-3 max-w-[110px]">
                  <span className="text-[11px] font-bold text-slate-800 block truncate">
                    {station.name}
                  </span>
                  <span className="text-[9px] font-mono text-slate-400 block mt-0.5">
                    {isOrigin ? "⚡ Origination" : `Hop ${idx + 1}`}
                  </span>
                </div>

                {/* Single Sensor Reading Popup on Click */}
                {isSelected && (
                  <div className="absolute top-20 z-30 w-56 bg-slate-900 text-white rounded-xl p-3 shadow-xl border border-slate-700 text-xs animate-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                      <span className="font-mono text-[10px] text-indigo-400 font-bold uppercase">
                        Sensed Reading
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHop(null);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-slate-200 mt-2 font-semibold leading-relaxed">
                      "{hop.sensorSnapshot}"
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                      <span>Historical Telemetry</span>
                      <span className="text-emerald-400 font-bold">{hop.hopConfidence}% Conf.</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="max-w-6xl mx-auto w-full p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">
          🔍 Click any station node above to view its recorded sensor snapshot during the defect transit event.
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          Last Resolved Event: DF-098 (Chassis Hemming Variance • Cleared)
        </span>
      </div>
    </div>
  );
}