"use client";
import React from "react";
import { HealthStatus, InstrumentationLevel, ZoneType } from "@/components/ui/stations-data";
import { ArrowRight, AlertTriangle, CheckCircle2, AlertCircle, Zap, Shield, FileText, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* StatusPill Component */
export function StatusPill({ status }: { status: HealthStatus }) {
  switch (status) {
    case "critical":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-300 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
          <span>Critical</span>
        </span>
      );
    case "warning":
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>Warning</span>
        </span>
      );
    case "online":
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Online</span>
        </span>
      );
  }
}

/* InstrumentationBadge Component */
export function InstrumentationBadge({ level }: { level: InstrumentationLevel }) {
  switch (level) {
    case "Full":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
          <Zap className="w-2.5 h-2.5 text-indigo-600" />
          <span>Full</span>
        </span>
      );
    case "Partial":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200">
          <Activity className="w-2.5 h-2.5 text-cyan-600" />
          <span>Partial</span>
        </span>
      );
    case "Manual":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300">
          <FileText className="w-2.5 h-2.5 text-slate-500" />
          <span>Manual</span>
        </span>
      );
  }
}

/* HealthDot Component */
export function HealthDot({ health }: { health: HealthStatus }) {
  switch (health) {
    case "critical":
      return <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] animate-pulse" />;
    case "warning":
      return <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-pulse" />;
    case "online":
    default:
      return <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]" />;
  }
}

/* MetricCard Component */
export function MetricCard({ label, value, subtext }: { label: string; value: string; subtext?: string }) {
  return (
    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
      <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block tracking-wider">{label}</span>
      <span className="text-xs font-bold text-slate-800 block mt-0.5 truncate">{value}</span>
      {subtext && <span className="text-[9px] text-slate-500 block mt-0.5">{subtext}</span>}
    </div>
  );
}

/* ProgressStat (Risk Score) Component */
export function ProgressStat({ score }: { score: number }) {
  const isHighRisk = score >= 70;
  const isMedRisk = score >= 40 && score < 70;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[11px]">
        <span className="text-slate-500 font-medium flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" /> Risk Score
        </span>
        <span
          className={`font-mono font-extrabold ${
            isHighRisk ? "text-rose-600" : isMedRisk ? "text-amber-600" : "text-emerald-600"
          }`}
        >
          {score}%
        </span>
      </div>

      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div
          className={`h-full transition-all duration-500 ${
            isHighRisk
              ? "bg-gradient-to-r from-amber-500 to-rose-600 shadow-[0_0_8px_rgba(225,29,72,0.5)]"
              : isMedRisk
              ? "bg-gradient-to-r from-indigo-500 to-amber-500"
              : "bg-gradient-to-r from-teal-400 to-emerald-500"
          }`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

/* LinkChip Component */
export function LinkChip({
  stationNumber,
  name,
  isDownstream = false,
  onClick,
}: {
  stationNumber: number;
  name: string;
  isDownstream?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-2xs transition-all hover:border-indigo-400 cursor-pointer"
    >
      <span className="text-indigo-600 font-extrabold">#{stationNumber < 10 ? `0${stationNumber}` : stationNumber}</span>
      <span className="font-sans text-[10px] text-slate-600 font-semibold truncate max-w-[90px]">{name}</span>
      <ArrowRight className="w-2.5 h-2.5 text-slate-400" />
    </button>
  );
}

/* MiniSparkline Component */
export function MiniSparkline({ points = [20, 22, 25, 24, 28, 30, 29, 28] }: { points?: number[] }) {
  const max = Math.max(...points, 100);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const width = 120;
  const height = 24;

  const pathData = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${idx === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/80">
      <div>
        <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Last {points.length} Cycles</span>
        <span className="text-[10px] font-mono font-bold text-slate-700">Variance: ±{(Math.max(...points) - Math.min(...points)).toFixed(1)}%</span>
      </div>
      <svg width={width} height={height} className="overflow-visible">
        <path d={pathData} fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((val, idx) => {
          const x = (idx / (points.length - 1)) * width;
          const y = height - ((val - min) / range) * (height - 6) - 3;
          return <circle key={idx} cx={x} cy={y} r="1.5" fill="#4f46e5" />;
        })}
      </svg>
    </div>
  );
}