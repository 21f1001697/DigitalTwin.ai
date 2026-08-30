"use client";
import React, { useState } from "react";
import Link from "next/link";
import { DefectTraceEvent, Station } from "@/lib/types";
import { STATIONS } from "@/lib/data";
import { ArrowRight, ChevronRight, CheckCircle2, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Cpu, Layers } from "lucide-react";
import { HealthStatusDot } from "@/components/shared/HealthStatusDot";

export function PropagationChain({ event }: { event: DefectTraceEvent }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
          Full Defect Propagation Chain
        </span>
        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
          6 Nodes Analyzed
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-800">
        {event.summary}
      </p>

      {/* Propagation Chain Flow */}
      <div className="flex items-center gap-2 overflow-x-auto py-3">
        {event.propagationPath.map((hop, idx) => {
          const station = STATIONS.find((s) => s.id === hop.stationId);
          if (!station) return null;
          const isOrigin = hop.stationId === event.originStationId;

          return (
            <React.Fragment key={hop.stationId}>
              <div className="flex flex-col items-center min-w-[100px] p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-1.5 font-mono text-xs font-black">
                  <HealthStatusDot health={hop.health} />
                  <span>ST-{station.stationNumber < 10 ? `0${station.stationNumber}` : station.stationNumber}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-700 truncate max-w-[90px] mt-1">
                  {station.name}
                </span>
                <span className="text-[9px] font-mono text-indigo-600 font-extrabold mt-1">
                  {hop.hopConfidence}% Conf.
                </span>
                {isOrigin && (
                  <span className="mt-1 px-1.5 py-0.2 rounded text-[8px] font-mono font-bold bg-rose-100 text-rose-800">
                    Origin
                  </span>
                )}
              </div>

              {idx < event.propagationPath.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export function EvidencePanel({ event }: { event: DefectTraceEvent }) {
  const [expandedSensors, setExpandedSensors] = useState<boolean>(true);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Multi-Cause Breakdown (Ranked Bar List) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
          Root Cause Probability Breakdown
        </span>

        <div className="space-y-3">
          {event.multiCause.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{item.cause}</span>
                <span className="font-mono font-extrabold text-indigo-600">{item.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className={`h-full rounded-full ${
                    idx === 0 ? "bg-gradient-to-r from-indigo-500 to-rose-500" : "bg-indigo-400"
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Model Trust Line */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-mono text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            Diagnostic Model Confidence: <strong className="text-slate-800">{event.modelConfidence}%</strong> (Validated against {event.validationCaseCount} past baseline cases)
          </span>
        </div>
      </div>

      {/* Sensor Evidence List (Per Station) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            Sensed Physical Evidence
          </span>
          <button
            onClick={() => setExpandedSensors(!expandedSensors)}
            className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            {expandedSensors ? "Collapse All" : "Expand All"}
          </button>
        </div>

        {expandedSensors && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {event.sensorEvidence.map((ev, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-slate-900 block font-sans">{ev.metric}</span>
                  <span className="text-[11px] text-slate-500">
                    Station #{ev.stationId} • {ev.stationName}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-rose-600 font-black block">{ev.measuredValue}</span>
                    <span className="text-[10px] text-slate-400">Target: {ev.nominalBand}</span>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                    {ev.deviation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Action Payoff Block (Bottom, Always Visible) */}
      <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
            Prescriptive Recommendation
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {event.recommendation.priority} Priority
          </span>
        </div>

        <h3 className="text-base font-black text-white">
          {event.recommendation.action}
        </h3>

        <p className="text-xs text-slate-300 font-mono">
          💡 Expected Impact: {event.recommendation.expectedImpact}
        </p>

        <div className="pt-2">
          <Link
            href="/insights/actions"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs font-mono uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          >
            <span>Send to Insights & Actions Queue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}