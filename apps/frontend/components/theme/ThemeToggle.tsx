"use client";
import React from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-1.5 p-1 rounded-full border transition-all cursor-pointer shadow-xs ${
        theme === "dark"
          ? "bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500"
          : "bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-300"
      } ${className}`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      <div className="flex items-center gap-1 px-1 text-[11px] font-mono font-bold">
        <Sun className={`w-3.5 h-3.5 transition-colors ${theme === "light" ? "text-amber-500 fill-amber-500" : "text-slate-500"}`} />
        <Moon className={`w-3.5 h-3.5 transition-colors ${theme === "dark" ? "text-indigo-400 fill-indigo-400" : "text-slate-400"}`} />
      </div>

      <div
        className={`w-4 h-4 rounded-full shadow-xs transition-transform transform ${
          theme === "dark" ? "bg-indigo-500 -translate-x-1" : "bg-white translate-x-0"
        }`}
      />
    </button>
  );
}