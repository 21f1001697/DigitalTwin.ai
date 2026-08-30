"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box } from "lucide-react";

export function TopNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Twin Explorer", href: "/twin/orbit", activeMatch: "/twin" },
    { label: "Insights & Actions", href: "/insights/predictions", activeMatch: "/insights" },
    { label: "Sensor Coverage", href: "/sensor-coverage", activeMatch: "/sensor-coverage" },
    { label: "Rollout", href: "/rollout", activeMatch: "/rollout" },
    { label: "How It Works", href: "/how-it-works", activeMatch: "/how-it-works" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/90 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xs font-sans">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-sm transition-transform group-hover:scale-105">
          <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
            <Box className="w-4 h-4 text-indigo-600 transition-transform group-hover:rotate-12" />
          </div>
        </div>
        <div className="flex items-baseline font-black tracking-wider text-base font-mono text-slate-900">
          <span>VANTAGE</span>
          <span className="text-indigo-600">.AI</span>
        </div>
      </Link>

      {/* Center Nav Links */}
      <div className="hidden md:flex items-center gap-1 bg-slate-100/90 p-1 rounded-2xl border border-slate-200 shadow-inner">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.activeMatch);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-white text-indigo-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right Deck: Live Status Pill */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[11px] font-mono font-bold shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="tracking-wider uppercase">SYSTEM ONLINE</span>
        </div>
      </div>
    </nav>
  );
}