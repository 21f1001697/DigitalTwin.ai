"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Station } from "@/lib/types";
import { 
  X, ArrowRight, CheckCircle2, AlertTriangle, Shield, Zap, Activity, 
  Clock, Info, Wrench, Check, FileText, ChevronDown, ChevronUp, Link as LinkIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InstrumentationBadge } from "@/components/station/InstrumentationBadge";
import { HealthStatusDot, RiskConfidenceTag } from "@/components/shared/HealthStatusDot";

export interface StationDrawerProps {
  station: Station;
  onClose: () => void;
  onSelectStation?: (stationId: number) => void;
}

export function StationDrawer({ station, onClose, onSelectStation }: StationDrawerProps) {
  const [showSecondaryDetails, setShowSecondaryDetails] = useState<boolean>(true);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleAction = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  const isHighRisk = station.riskScore >= 70;
  const isMedRisk = station.riskScore >= 40 && station.riskScore < 70;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white/95 backdrop-blur-2xl border-l border-slate-200/90 shadow-[0_0_60px_rgba(15,23,42,0.2)] flex flex-col justify-between font-sans animate-in slide-in-from-right duration-300">
      
      {/* Drawer Header */}
      <div className="p-5 pb-4 border-b border-slate-100 bg-slate-50/90 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-black text-xs shadow-xs">
              #{station.stationNumber < 10 ? `0${station.stationNumber}` : station.stationNumber}
            </span>
            <div>
              <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>{station.name}</span>
                <HealthStatusDot health={station.health} />
              </h2>
              {/* Meta Line: Code + Zone */}
              <p className="text-[11px] font-mono text-slate-500 font-bold mt-0.5">
                CODE: {station.code} • {station.zone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-800 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* PRIMARY INFO: Health/Risk score + Confidence + Instrumentation + Active Alert */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-black font-mono ${
                isHighRisk ? "text-rose-600" : isMedRisk ? "text-amber-600" : "text-emerald-600"
              }`}
            >
              Risk: {station.riskScore}%
            </span>
            <RiskConfidenceTag confidence={station.confidence} />
          </div>

          <InstrumentationBadge level={station.instrumentation} />
        </div>

        {/* Active alert line if any */}
        {station.activeAlert && (
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-mono font-bold flex items-start gap-2 shadow-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>{station.activeAlert}</span>
          </div>
        )}

        {/* One line real description */}
        <p className="text-xs text-slate-600 leading-relaxed">
          {station.description}
        </p>
      </div>

      {/* Action Notification Toast */}
      {actionMessage && (
        <div className="mx-4 mt-2 bg-slate-900 text-white text-xs font-mono py-2 px-3.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* SECONDARY SCROLLABLE DETAILS */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
        
        {/* Toggleable Details Bar */}
        <button
          onClick={() => setShowSecondaryDetails(!showSecondaryDetails)}
          className="w-full flex items-center justify-between text-slate-500 font-mono text-[11px] uppercase font-bold tracking-wider py-1 border-b border-slate-100 cursor-pointer"
        >
          <span>Live Instrumentation & Telemetry</span>
          {showSecondaryDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showSecondaryDetails && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Live Metrics vs Baseline band (Only what station measures) */}
            {station.sensors && station.sensors.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Measured Sensor Channels vs Baseline Band
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {station.sensors.map((sensor, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-[11px] font-mono flex flex-col justify-between ${
                        sensor.isNominal
                          ? "bg-slate-50 border-slate-200/80 text-slate-700"
                          : "bg-amber-50 border-amber-300 text-amber-950 font-bold"
                      }`}
                    >
                      <span className="text-[9px] text-slate-400 truncate">{sensor.name}</span>
                      <span className="text-sm font-black mt-1">
                        {sensor.value} <span className="text-[10px] font-normal">{sensor.unit}</span>
                      </span>
                      <span className="text-[9px] text-slate-500 mt-1 border-t border-slate-200/50 pt-1">
                        Nominal: {sensor.baseline} {sensor.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* If Manual Check Station: Replace with last operator log entry */}
            {station.manualLog && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block mb-1">
                  Last Operator Log Entry
                </span>
                <p className="italic font-mono text-[11px] text-slate-800">
                  "{station.manualLog}"
                </p>
                <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-[10px] font-bold mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Physical Checklist Verified</span>
                </div>
              </div>
            )}

            {/* Mini Sparkline — Last N Cycles */}
            {station.sparklineHistory && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Recent Variance</span>
                  <span className="text-xs font-bold font-mono text-slate-800">±{(Math.max(...station.sparklineHistory) - Math.min(...station.sparklineHistory)).toFixed(1)}% Cycle-to-Cycle</span>
                </div>
                <div className="flex items-end gap-1 h-6">
                  {station.sparklineHistory.map((val, idx) => (
                    <div
                      key={idx}
                      className="w-2.5 bg-indigo-500 rounded-t-xs"
                      style={{ height: `${Math.min(100, Math.max(20, val * 1.5))}%` }}
                      title={`Cycle ${idx + 1}: ${val}%`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Predicted Downstream Impact */}
            {station.predictedImpact && (
              <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] font-bold text-indigo-900 uppercase block">Predicted Propagation Impact</span>
                  <p className="text-[11px] text-slate-700 mt-0.5">{station.predictedImpact}</p>
                </div>
              </div>
            )}

            {/* Next Scheduled Maintenance Window */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[10px]">
              <span className="text-slate-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Next Maintenance:
              </span>
              <span className="font-bold text-slate-800">{station.nextMaintenance}</span>
            </div>

            {/* Upstream / Downstream LinkChips */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Propagation Chain Links
              </span>

              <div className="space-y-1.5">
                {station.upstreamIds.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                    <span className="text-slate-400 font-bold w-20">Upstream:</span>
                    {station.upstreamIds.map((id) => (
                      <button
                        key={id}
                        onClick={() => onSelectStation && onSelectStation(id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-indigo-700 font-bold border border-slate-200 transition-colors flex items-center gap-1"
                      >
                        <span>ST-{id < 10 ? `0${id}` : id}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}

                {station.downstreamIds.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                    <span className="text-slate-400 font-bold w-20">Downstream:</span>
                    {station.downstreamIds.map((id) => (
                      <button
                        key={id}
                        onClick={() => onSelectStation && onSelectStation(id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-indigo-700 font-bold border border-slate-200 transition-colors flex items-center gap-1"
                      >
                        <span>ST-{id < 10 ? `0${id}` : id}</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACTION ROW: Always Visible at Bottom */}
      <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2 shadow-lg">
        <Link
          href="/defect-trace/DF-104"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-9 text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>View Full Trace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setAcknowledged(true);
            handleAction(`Telemetry acknowledged for #${station.code}`);
          }}
          disabled={acknowledged}
          className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold h-9 text-xs rounded-xl shadow-2xs cursor-pointer"
        >
          <Check className="w-3.5 h-3.5 text-emerald-600 mr-1" />
          <span>{acknowledged ? "Acknowledged" : "Acknowledge"}</span>
        </Button>

        <Link
          href="/insights/actions"
          className="px-3 h-9 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold text-xs flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
          title="Flag for maintenance queue"
        >
          <Wrench className="w-3.5 h-3.5 text-amber-600" />
        </Link>
      </div>
    </div>
  );
}