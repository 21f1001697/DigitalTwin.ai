"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PredictionItem, ActionItem } from "@/lib/types";
import { PREDICTIONS_LIST, INITIAL_ACTIONS } from "@/lib/data";
import { 
  ArrowRight, Check, X, Shield, Clock, ChevronDown, ChevronUp, 
  AlertTriangle, CheckCircle2, UserCheck, Sparkles, Filter 
} from "lucide-react";
import { HealthStatusDot, RiskConfidenceTag } from "@/components/shared/HealthStatusDot";

export function PredictionList() {
  const [predictions, setPredictions] = useState<PredictionItem[]>(PREDICTIONS_LIST);
  const [expandedId, setExpandedId] = useState<string | null>("PRED-01");
  const [sortBy, setSortBy] = useState<"risk" | "station">("risk");

  const sorted = [...predictions].sort((a, b) => {
    if (sortBy === "risk") return b.riskScore - a.riskScore;
    return a.stationId - b.stationId;
  });

  return (
    <div className="space-y-4 font-sans max-w-5xl mx-auto">
      
      {/* Triage List Sort Filter */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
          Active Production Line Predictions ({predictions.length})
        </span>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Sort by:</span>
          <button
            onClick={() => setSortBy("risk")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              sortBy === "risk" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Risk % (Desc)
          </button>
          <button
            onClick={() => setSortBy("station")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              sortBy === "station" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Station Sequence
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {sorted.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
            >
              {/* Row Header (Click to Expand Inline) */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HealthStatusDot health={item.health} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-900">{item.stationName}</span>
                      <span className="text-[10px] font-mono font-bold text-slate-400">#{item.stationCode}</span>
                    </div>
                    <span className="text-xs text-slate-600 font-medium block mt-0.5">
                      {item.defectType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-sm font-black font-mono text-indigo-600 block">
                      {item.riskScore}% Risk
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" /> TTF: {item.timeToFailure}
                    </span>
                  </div>
                  <RiskConfidenceTag confidence={item.confidence} />
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {/* Inline Expansion: Recommendation Block + "View full trace" link */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 bg-slate-50/60 space-y-3 animate-in fade-in duration-150">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase block">
                      AI Prescriptive Recommendation
                    </span>
                    <p className="text-xs font-semibold text-slate-800">
                      {item.recommendationSummary}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      💡 {item.expectedImpact}
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-1">
                    <Link
                      href={`/defect-trace/${item.defectTraceId}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span>View Full Defect Trace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ActionQueue() {
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [showRecentDecisions, setShowRecentDecisions] = useState<boolean>(true);

  const pendingActions = actions.filter((a) => a.status === "Pending");
  const completedActions = actions.filter((a) => a.status !== "Pending");

  const handleDecision = (id: string, decision: "Approved" | "Dismissed") => {
    setActions((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: decision,
              decidedBy: "Shift Supervisor (You)",
              decidedAt: "Just now",
            }
          : a
      )
    );
  };

  return (
    <div className="space-y-8 font-sans max-w-5xl mx-auto">
      
      {/* Pending Approval Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Pending Human Approval Queue ({pendingActions.length})
          </span>
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
            Human-in-the-Loop Active
          </span>
        </div>

        {pendingActions.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 font-mono text-xs">
            ✨ All pending actions have been decided. Zero backlog.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingActions.map((action) => (
              <div
                key={action.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-slate-900">
                      {action.stationName} (#{action.stationCode})
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                      {action.priority} Priority
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800">
                    {action.recommendedAction}
                  </p>

                  <p className="text-[11px] font-mono text-slate-500">
                    Expected impact: {action.expectedImpact}
                  </p>
                </div>

                {/* Approve / Dismiss Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDecision(action.id, "Approved")}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>

                  <button
                    onClick={() => handleDecision(action.id, "Dismissed")}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-mono font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5 text-slate-400" />
                    <span>Dismiss</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Collapsed "Recent Decisions" Audit Trail */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <button
          onClick={() => setShowRecentDecisions(!showRecentDecisions)}
          className="flex items-center justify-between w-full text-xs font-mono font-bold text-slate-400 uppercase tracking-wider cursor-pointer"
        >
          <span>Recent Human Decisions & Audit Trail ({completedActions.length})</span>
          {showRecentDecisions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showRecentDecisions && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {completedActions.map((action) => (
              <div
                key={action.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      action.status === "Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {action.status}
                  </span>
                  <span className="font-bold text-slate-800 font-sans">{action.recommendedAction}</span>
                </div>

                <div className="text-right text-[10px] text-slate-400">
                  <span className="text-slate-600 block">{action.decidedBy}</span>
                  <span>{action.decidedAt}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}