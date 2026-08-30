"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, AlertTriangle, ChevronLeft, ChevronRight, Box, Cpu, Zap, Activity, CheckCircle2, ShieldAlert, Sparkles, Orbit, Layers, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export interface InteractiveFactorySceneProps {
  onExploreStations: (stationId?: number) => void;
}

export default function InteractiveFactoryScene({ onExploreStations }: InteractiveFactorySceneProps) {
  const [selectedElement, setSelectedElement] = useState<"st24" | "arm-alpha" | "arm-beta" | "monitor" | "car" | null>(null);
  const [activeCameraAngle, setActiveCameraAngle] = useState<number>(0);
  const [conveyorSpeed, setConveyorSpeed] = useState<number>(1);
  const [isWelding, setIsWelding] = useState<boolean>(true);
  const [liveMetric, setLiveMetric] = useState<number>(87);

  // Periodic metric jitter for live sensor simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetric((prev) => {
        const delta = (Math.random() - 0.5) * 2;
        return Math.min(99, Math.max(82, Math.round((prev + delta) * 10) / 10));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const angles = [
    { title: "Main Assembly Line ST24", status: "Active Telemetry" },
    { title: "Laser Robotic Welding Bay", status: "Robotics Cluster 7" },
    { title: "Outbound Conveyor Dispatch", status: "Autonomous AGV Track" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#f3f4f8] text-slate-900 overflow-hidden select-none flex flex-col justify-between font-sans">
      
      {/* Top Header Bar */}
      <header className="relative z-30 w-full px-6 sm:px-12 py-5 flex items-center justify-between">
        {/* Brand Logo matching user image */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <Box className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-baseline font-black tracking-tight text-xl font-mono text-slate-900">
            <span>DIGITALTWIN</span>
            <span className="text-indigo-600">.AI</span>
          </div>
        </div>

        {/* Top Right: System Online Pill & Switcher */}
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onExploreStations()}
            className="hidden sm:flex border-slate-300 bg-white/80 hover:bg-white text-slate-800 font-semibold text-xs rounded-full px-4 shadow-sm backdrop-blur-md items-center gap-1.5"
          >
            <Orbit className="w-3.5 h-3.5 text-indigo-600" />
            <span>24-Station Orbit Command</span>
          </Button>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-sm text-emerald-600 text-xs font-mono font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase text-[11px]">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Hero Column: Exact Typography & CTA from user's image */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center py-6 z-20 space-y-4">
          <div className="space-y-0.5">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[0.95]">
              See.
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 bg-clip-text text-transparent leading-[0.95]">
              Predict.
            </h1>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent leading-[0.95]">
              Act.
            </h1>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed max-w-sm pt-2">
            Autonomous digital twin monitoring with real-time robotic telemetry and predictive station alerts.
          </p>

          {/* Glowing Purple Button matching user image */}
          <div className="pt-3">
            <button
              onClick={() => onExploreStations(24)}
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-base shadow-[0_10px_30px_rgba(99,102,241,0.5)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.65)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
            >
              <span>Explore</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick status indicator */}
          <div className="flex items-center gap-4 pt-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span> 24 Stations Linked
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-amber-600 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> ST24 Alert Active
            </span>
          </div>
        </div>

        {/* Right Stage: Interactive Animated Assembly Line */}
        <div className="w-full lg:w-7/12 relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
          
          {/* 3D Isometric Factory Ground Plane */}
          <div className="relative w-full h-[460px] sm:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-white/90 via-slate-100/90 to-indigo-50/50 border border-slate-200/80 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
            
            {/* Background 3D Factory Elements Rendered on Canvas/SVG */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            {/* Ambient Factory Overhead Structure & Glass Skylight */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-200/40 via-transparent to-transparent pointer-events-none" />

            {/* Continuous Conveyor Track SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 400" preserveAspectRatio="none">
              {/* Conveyor Shadows */}
              <path
                d="M 50,300 C 150,220 450,220 550,300 C 450,380 150,380 50,300 Z"
                fill="none"
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="48"
              />
              {/* Conveyor Outer Metallic Rail */}
              <path
                d="M 50,300 C 150,220 450,220 550,300 C 450,380 150,380 50,300 Z"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="38"
              />
              {/* Conveyor Belt Inner Tread */}
              <path
                d="M 50,300 C 150,220 450,220 550,300 C 450,380 150,380 50,300 Z"
                fill="none"
                stroke="#1e293b"
                strokeWidth="28"
                strokeDasharray="8,6"
                className="animate-[dash_1s_linear_infinite]"
              />
              {/* Conveyor Center Track Glow Guide */}
              <path
                d="M 50,300 C 150,220 450,220 550,300 C 450,380 150,380 50,300 Z"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                opacity="0.8"
              />
            </svg>

            {/* ANIMATED CARS TRAVELING ALONG THE CONVEYOR */}
            
            {/* CAR 1 (White Sedan entering assembly zone) */}
            <div 
              className="absolute z-20 transition-transform duration-100 cursor-pointer animate-[carTrack1_12s_linear_infinite]"
              onClick={() => setSelectedElement("car")}
            >
              <div className="relative group">
                <svg width="90" height="50" viewBox="0 0 100 55" className="drop-shadow-lg transform transition-transform group-hover:scale-110">
                  {/* Car Shadow */}
                  <ellipse cx="50" cy="46" rx="42" ry="7" fill="rgba(0,0,0,0.25)" />
                  {/* Car Body */}
                  <path d="M 12 38 L 22 24 L 40 16 L 70 16 L 86 26 L 94 36 L 88 42 L 14 42 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                  {/* Windshield & Windows */}
                  <path d="M 42 19 L 66 19 L 78 27 L 30 27 Z" fill="#0f172a" />
                  {/* Headlights */}
                  <circle cx="90" cy="34" r="2.5" fill="#38bdf8" className="animate-pulse" />
                  <circle cx="14" cy="38" r="2" fill="#ef4444" />
                  {/* Wheels */}
                  <circle cx="28" cy="42" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <circle cx="76" cy="42" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <circle cx="28" cy="42" r="2" fill="#e2e8f0" />
                  <circle cx="76" cy="42" r="2" fill="#e2e8f0" />
                </svg>
                {/* Telemetry Tag */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-mono text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  CHASSIS #A-108
                </div>
              </div>
            </div>

            {/* CAR 2 (Silver Sedan currently under ST24 inspection station) */}
            <div 
              className="absolute z-20 transition-transform duration-100 cursor-pointer animate-[carTrack2_12s_linear_infinite]"
              onClick={() => setSelectedElement("car")}
            >
              <div className="relative group">
                <svg width="90" height="50" viewBox="0 0 100 55" className="drop-shadow-lg transform transition-transform group-hover:scale-110">
                  <ellipse cx="50" cy="46" rx="42" ry="7" fill="rgba(0,0,0,0.25)" />
                  <path d="M 12 38 L 22 24 L 40 16 L 70 16 L 86 26 L 94 36 L 88 42 L 14 42 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                  <path d="M 42 19 L 66 19 L 78 27 L 30 27 Z" fill="#0f172a" />
                  <circle cx="90" cy="34" r="2.5" fill="#38bdf8" className="animate-pulse" />
                  <circle cx="14" cy="38" r="2" fill="#ef4444" />
                  <circle cx="28" cy="42" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <circle cx="76" cy="42" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                </svg>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-mono text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
                  CHASSIS #A-109
                </div>
              </div>
            </div>

            {/* CAR 3 (White Sedan moving to outbound stage) */}
            <div 
              className="absolute z-20 transition-transform duration-100 cursor-pointer animate-[carTrack3_12s_linear_infinite]"
              onClick={() => setSelectedElement("car")}
            >
              <div className="relative group">
                <svg width="90" height="50" viewBox="0 0 100 55" className="drop-shadow-lg transform transition-transform group-hover:scale-110">
                  <ellipse cx="50" cy="46" rx="42" ry="7" fill="rgba(0,0,0,0.25)" />
                  <path d="M 12 38 L 22 24 L 40 16 L 70 16 L 86 26 L 94 36 L 88 42 L 14 42 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
                  <path d="M 42 19 L 66 19 L 78 27 L 30 27 Z" fill="#0f172a" />
                  <circle cx="90" cy="34" r="2.5" fill="#38bdf8" />
                  <circle cx="28" cy="42" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <circle cx="76" cy="42" r="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* ROBOTIC ARM 1 (Alpha - Left Assembly) */}
            <div 
              className="absolute top-[22%] left-[28%] z-20 cursor-pointer group"
              onClick={() => setSelectedElement("arm-alpha")}
            >
              <div className="relative flex flex-col items-center">
                {/* Arm Base Stand */}
                <div className="w-12 h-6 bg-slate-300 border-2 border-slate-400 rounded-t-lg shadow-md" />
                
                {/* Joint 1 */}
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-slate-400 -mt-2 flex items-center justify-center shadow-inner">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-ping" />
                </div>

                {/* Animated Articulated Arm Segments */}
                <div className="w-4 h-16 bg-slate-100 border border-slate-400 origin-top -mt-1 animate-[robotArm1_4s_ease-in-out_infinite] flex flex-col justify-between items-center py-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div className="w-6 h-4 bg-slate-800 rounded-sm -mb-2 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  </div>
                </div>

                {/* Welding Laser Sparks Animation */}
                {isWelding && (
                  <div className="absolute top-28 left-6 pointer-events-none">
                    <div className="w-3 h-3 rounded-full bg-cyan-300 blur-[2px] animate-ping" />
                    <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent transform rotate-45 animate-pulse" />
                  </div>
                )}

                {/* Label Tag */}
                <div className="mt-1 bg-white/90 border border-slate-300 text-[9px] font-mono px-1.5 py-0.5 rounded shadow-sm group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
                  ST07 ARM-α
                </div>
              </div>
            </div>

            {/* ROBOTIC ARM 2 (Beta - Right Assembly) */}
            <div 
              className="absolute top-[24%] left-[65%] z-20 cursor-pointer group"
              onClick={() => setSelectedElement("arm-beta")}
            >
              <div className="relative flex flex-col items-center">
                <div className="w-12 h-6 bg-slate-300 border-2 border-slate-400 rounded-t-lg shadow-md" />
                <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-slate-400 -mt-2 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
                </div>
                <div className="w-4 h-18 bg-slate-100 border border-slate-400 origin-top -mt-1 animate-[robotArm2_5s_ease-in-out_infinite] flex flex-col justify-between items-center py-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400" />
                  <div className="w-6 h-4 bg-slate-800 rounded-sm -mb-2 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  </div>
                </div>
                <div className="mt-1 bg-white/90 border border-slate-300 text-[9px] font-mono px-1.5 py-0.5 rounded shadow-sm group-hover:border-purple-500 group-hover:text-purple-600 transition-colors">
                  ST08 ARM-β
                </div>
              </div>
            </div>

            {/* HOLOGRAPHIC ALERT STATION ST24 (Center Stage - Exact replica of user's image) */}
            <div 
              className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              onClick={() => setSelectedElement("st24")}
            >
              {/* ST24 Warning Pill Badge */}
              <div className="relative flex flex-col items-center">
                <div className="px-3 py-1 bg-white/95 border-2 border-amber-400/90 rounded-xl shadow-[0_5px_20px_rgba(245,158,11,0.35)] flex items-center gap-1.5 font-mono font-bold text-xs text-slate-900 group-hover:scale-105 transition-transform">
                  <span>ST24</span>
                  <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce" />
                </div>

                {/* 3D Holographic Orange Cube Frame */}
                <div className="relative w-20 h-20 -mt-1 rounded-xl border-2 border-amber-400/80 bg-amber-500/15 backdrop-blur-[2px] shadow-[0_0_30px_rgba(245,158,11,0.35)] flex flex-col items-center justify-center animate-pulse">
                  {/* Glowing Warning Triangle Icon inside 3D Cube */}
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/60 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>

                  {/* Corner accents */}
                  <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-amber-400"></span>
                  <span className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-amber-400"></span>
                  <span className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-amber-400"></span>
                  <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-amber-400"></span>

                  <span className="text-[8px] font-mono font-bold text-amber-800 uppercase mt-1 tracking-wider">
                    ALERT ZONE
                  </span>
                </div>
              </div>
            </div>

            {/* CONTROL DASHBOARD MONITOR (Right Screen with 87% metric & live waves) */}
            <div 
              className="absolute top-[18%] right-[5%] z-25 cursor-pointer group"
              onClick={() => setSelectedElement("monitor")}
            >
              <div className="relative w-44 sm:w-48 bg-slate-900 border-4 border-slate-300 rounded-2xl p-2.5 shadow-2xl text-white group-hover:border-indigo-400 transition-colors">
                
                {/* Screen Header */}
                <div className="flex items-center justify-between border-b border-slate-700 pb-1.5 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-300 font-bold">TELEMETRY</span>
                  </div>
                  
                  {/* Live 87% Progress Ring */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-950 border border-indigo-500/60 text-indigo-300 font-mono text-[11px] font-bold shadow-inner">
                    {liveMetric}%
                  </div>
                </div>

                {/* Animated Wave Graphs */}
                <div className="h-10 w-full flex items-end justify-between gap-1 px-1 mb-2 bg-slate-950/60 rounded-lg p-1">
                  {[40, 65, 85, 30, 95, 75, 60, 88, 45, 90, 70, 82].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-t-sm animate-pulse"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Bottom Telemetry Status */}
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                  <span>LINE: RUNNING</span>
                  <span className="text-emerald-400 font-bold">ST24: SYNC</span>
                </div>
              </div>
            </div>

            {/* Plant Pot Details matching the user image */}
            <div className="absolute top-[38%] right-[2%] z-15 pointer-events-none opacity-85">
              <div className="w-5 h-7 bg-slate-300 border border-slate-400 rounded-b-md" />
              <div className="w-8 h-8 -mt-6 -ml-1.5 bg-emerald-600 rounded-full blur-[1px]" />
            </div>

            {/* Interactive Detail Popup Card */}
            {selectedElement && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-80 z-40 animate-in fade-in zoom-in-95 duration-200">
                <Card className="bg-white/95 backdrop-blur-xl border-indigo-500/40 shadow-2xl rounded-2xl overflow-hidden text-slate-900">
                  <CardHeader className="p-3.5 pb-2 bg-slate-50 border-b border-slate-200 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xs font-bold text-slate-900">
                        {selectedElement === "st24"
                          ? "Station 24: AI Feedback & Recalibration"
                          : selectedElement === "arm-alpha"
                          ? "Station 07: Robotic Assembly Alpha"
                          : selectedElement === "arm-beta"
                          ? "Station 08: Robotic Laser Welding Beta"
                          : selectedElement === "monitor"
                          ? "Central Control & Telemetry Dashboard"
                          : "Automated Vehicle Chassis on Conveyor"}
                      </CardTitle>
                      <CardDescription className="text-[10px] font-mono text-indigo-600">
                        {selectedElement === "st24"
                          ? "STATUS: THERMAL RE-ALIGNMENT REQUIRED"
                          : "STATUS: NOMINAL OPERATION"}
                      </CardDescription>
                    </div>

                    <button
                      onClick={() => setSelectedElement(null)}
                      className="text-slate-400 hover:text-slate-600 text-xs font-bold p-1"
                    >
                      ✕
                    </button>
                  </CardHeader>

                  <CardContent className="p-3.5 space-y-2 text-xs">
                    <p className="text-slate-600 text-[11px]">
                      {selectedElement === "st24"
                        ? "Station 24 aggregates telemetry across all 24 stations. A minor thermal anomaly was flagged in sector 3."
                        : selectedElement === "arm-alpha"
                        ? "High-speed multi-axis robotic arm executing chassis framing with 0.02mm micro-tolerance."
                        : selectedElement === "arm-beta"
                        ? "Laser welding arm applying continuous structural seam welds with automated optical verification."
                        : selectedElement === "monitor"
                        ? "Live factory line telemetry streaming 24 stations with 0.2ms edge latency."
                        : "Autonomous guided vehicle tracking along the smart magnetic conveyor loop."}
                    </p>

                    <div className="pt-2">
                      <Button
                        size="sm"
                        onClick={() => onExploreStations(selectedElement === "st24" ? 24 : undefined)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <span>Open Station in 24-Node Orbit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Left & Right Carousel Arrows matching user image */}
          <button
            onClick={() => setActiveCameraAngle((prev) => (prev - 1 + angles.length) % angles.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 z-30 cursor-pointer"
            title="Previous Angle"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveCameraAngle((prev) => (prev + 1) % angles.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 z-30 cursor-pointer"
            title="Next Angle"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="relative z-20 w-full px-6 sm:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono border-t border-slate-200/80 bg-white/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-indigo-600" />
          <span>DIGITALTWIN.AI • Interactive Robotic Line & Conveyor Telemetry</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <button onClick={() => onExploreStations(24)} className="text-indigo-600 hover:underline font-bold">
            Inspect ST24 Warning →
          </button>
          <span>•</span>
          <button onClick={() => onExploreStations()} className="text-slate-700 hover:underline">
            View 24 Concentric Orbit Stations
          </button>
        </div>
      </footer>

      {/* Embedded CSS Animations for Conveyor Cars & Robotic Arms */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -28;
          }
        }

        /* Car 1 path around the conveyor loop */
        @keyframes carTrack1 {
          0% {
            top: 68%;
            left: 20%;
            transform: scale(0.95) rotate(-10deg);
          }
          30% {
            top: 68%;
            left: 45%;
            transform: scale(1) rotate(0deg);
          }
          60% {
            top: 70%;
            left: 72%;
            transform: scale(0.95) rotate(12deg);
          }
          80% {
            top: 48%;
            left: 78%;
            transform: scale(0.8) rotate(180deg) scaleY(-1);
          }
          95% {
            top: 48%;
            left: 25%;
            transform: scale(0.8) rotate(190deg) scaleY(-1);
          }
          100% {
            top: 68%;
            left: 20%;
            transform: scale(0.95) rotate(-10deg);
          }
        }

        /* Car 2 path around the conveyor loop */
        @keyframes carTrack2 {
          0% {
            top: 70%;
            left: 72%;
            transform: scale(0.95) rotate(12deg);
          }
          20% {
            top: 48%;
            left: 78%;
            transform: scale(0.8) rotate(180deg) scaleY(-1);
          }
          50% {
            top: 48%;
            left: 25%;
            transform: scale(0.8) rotate(190deg) scaleY(-1);
          }
          70% {
            top: 68%;
            left: 20%;
            transform: scale(0.95) rotate(-10deg);
          }
          100% {
            top: 70%;
            left: 72%;
            transform: scale(0.95) rotate(12deg);
          }
        }

        /* Car 3 path around the conveyor loop */
        @keyframes carTrack3 {
          0% {
            top: 48%;
            left: 35%;
            transform: scale(0.8) rotate(190deg) scaleY(-1);
          }
          30% {
            top: 68%;
            left: 20%;
            transform: scale(0.95) rotate(-10deg);
          }
          60% {
            top: 68%;
            left: 45%;
            transform: scale(1) rotate(0deg);
          }
          90% {
            top: 70%;
            left: 72%;
            transform: scale(0.95) rotate(12deg);
          }
          100% {
            top: 48%;
            left: 35%;
            transform: scale(0.8) rotate(190deg) scaleY(-1);
          }
        }

        @keyframes robotArm1 {
          0%, 100% {
            transform: rotate(-15deg);
          }
          50% {
            transform: rotate(20deg);
          }
        }

        @keyframes robotArm2 {
          0%, 100% {
            transform: rotate(18deg);
          }
          50% {
            transform: rotate(-18deg);
          }
        }
      `}</style>
    </div>
  );
}