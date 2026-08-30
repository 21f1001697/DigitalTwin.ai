"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopNav } from "@/components/nav/TopNav";
import { AlertTriangle } from "lucide-react";

export default function TwinLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { label: "Interactive Factory", href: "/twin/factory" },
    { label: "Station Orbit", href: "/twin/orbit" },
    { label: "Node Timeline", href: "/twin/timeline" },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      <TopNav />

      {/* Global Status Strip + Tab Bar */}
      <div className="sticky top-[57px] z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        
        {/* Left: Global Status Strip */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold text-slate-800">Line Health: Warning (ST-10)</span>
          </div>

          <div className="flex items-center gap-2 text-slate-500">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
            <span>1 Critical · 3 Warnings Active</span>
          </div>
        </div>

        {/* Center: Shared Tab Bar (Interactive Factory | Station Orbit | Node Timeline) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shadow-inner">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Full-bleed Canvas */}
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}