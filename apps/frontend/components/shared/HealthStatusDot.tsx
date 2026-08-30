"use client";
import React from "react";
import { HealthStatus, ConfidenceLevel, InstrumentationLevel } from "@/lib/types";
import { Zap, Activity, FileText } from "lucide-react";

export function HealthStatusDot({ health, size = "md" }: { health: HealthStatus; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
  };

  switch (health) {
    case "critical":
      return (
        <span className="relative flex items-center justify-center">
          <span className={`animate-ping absolute inline-flex ${sizeClasses[size]} rounded-full bg-rose-400 opacity-75`} />
          <span className={`relative inline-flex rounded-full ${sizeClasses[size]} bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)]`} />
        </span>
      );
    case "warning":
      return (
        <span className="relative flex items-center justify-center">
          <span className={`animate-ping absolute inline-flex ${sizeClasses[size]} rounded-full bg-amber-400 opacity-75`} />
          <span className={`relative inline-flex rounded-full ${sizeClasses[size]} bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]`} />
        </span>
      );
    case "online":
    default:
      return <span className={`inline-flex rounded-full ${sizeClasses[size]} bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]`} />;
  }
}

export function RiskConfidenceTag({ confidence }: { confidence: ConfidenceLevel }) {
  switch (confidence) {
    case "High":
      return (
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          High Conf.
        </span>
      );
    case "Med":
      return (
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
          Med Conf.
        </span>
      );
    case "Low":
    default:
      return (
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
          Low Conf.
        </span>
      );
  }
}

export function InstrumentationBadge({ level }: { level: InstrumentationLevel }) {
  switch (level) {
    case "Full":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-2xs">
          <Zap className="w-2.5 h-2.5 text-indigo-600" />
          <span>Full</span>
        </span>
      );
    case "Partial":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs">
          <Activity className="w-2.5 h-2.5 text-cyan-600" />
          <span>Partial</span>
        </span>
      );
    case "Manual":
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs">
          <FileText className="w-2.5 h-2.5 text-slate-500" />
          <span>Manual</span>
        </span>
      );
  }
}