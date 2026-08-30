"use client";
import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TopNav } from "@/components/nav/TopNav";
import { ACTIVE_DEFECT_EVENT, STATIONS } from "@/lib/data";
import { PropagationChain, EvidencePanel } from "@/components/defect-trace/PropagationChain";
import { ArrowLeft, AlertTriangle, ShieldCheck, Activity, HelpCircle } from "lucide-react";

export default function DefectTracePage() {
  const params = useParams();
  const event = ACTIVE_DEFECT_EVENT;
  const originStation = STATIONS.find((s) => s.id === event.originStationId);

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <TopNav />

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 space-y-6 flex-1">
        
        {/* Back Link */}
        <Link
          href="/twin/orbit"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Twin Explorer</span>
        </Link>

        {/* Header: Defect ID + Originating Station + Status + Severity */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-rose-50 text-rose-700 border border-rose-200">
                DEFECT INVESTIGATION #{event.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Status: {event.status}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {event.severity} Severity
              </span>
            </div>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
              {event.title}
            </h1>

            <p className="text-xs font-mono text-slate-500 mt-1">
              Originating Station: <strong className="text-slate-800">#{originStation?.code} ({originStation?.name})</strong> • Line Zone: {originStation?.zone}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold">Model Confidence</span>
            <span className="text-xl font-black font-mono text-indigo-600 block">
              {event.modelConfidence}%
            </span>
          </div>
        </div>

        {/* Primary: The Full Propagation Chain */}
        <PropagationChain event={event} />

        {/* Secondary: Root Cause Breakdown + Sensor Evidence + Prescriptive Recommendation */}
        <EvidencePanel event={event} />

      </main>
    </div>
  );
}