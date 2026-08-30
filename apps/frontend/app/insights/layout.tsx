"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopNav } from "@/components/nav/TopNav";
import { PREDICTIONS_LIST, INITIAL_ACTIONS } from "@/lib/data";
import { Sparkles, CheckSquare } from "lucide-react";

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pendingCount = INITIAL_ACTIONS.filter((a) => a.status === "Pending").length;

  const subTabs = [
    { label: "Predictions", href: "/insights/predictions", count: PREDICTIONS_LIST.length },
    { label: "Actions (Approval Queue)", href: "/insights/actions", count: pendingCount, isAlert: pendingCount > 0 },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <TopNav />

      {/* Sub-tab Shell Strip */}
      <div className="sticky top-[57px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        
        {/* Left Counts */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{PREDICTIONS_LIST.length} Active Predictions</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-bold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>{pendingCount} Pending Human Sign-Offs</span>
          </div>
        </div>

        {/* Sub-tab Bar */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-inner">
          {subTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    tab.isAlert
                      ? "bg-amber-500 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        {children}
      </main>
    </div>
  );
}