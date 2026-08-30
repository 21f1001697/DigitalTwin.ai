"use client";
import React, { useState } from "react";
import { ArrowRight, AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Cpu, Eye, Layers, Orbit, Sparkles, Zap, Radio, Activity, BarChart3, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StationItem, defaultStations } from "@/components/ui/stations-data";

export interface DigitalTwinHeroProps {
  onNavigateToStations: (stationId?: number) => void;
}

interface Hotspot {
  id: number;
  stationId: number;
  label: string;
  code: string;
  xPercent: number; // Left %
  yPercent: number; // Top %
  type: "alert" | "robot" | "monitor" | "conveyor";
  statusText: string;
  metric: string;
}

const factoryHotspots: Hotspot[] = [
  {
    id: 1,
    stationId: 24,
    label: "ST24 AI Feedback Node",
    code: "ST24 ⚠️",
    xPercent: 54.5,
    yPercent: 47.5,
    type: "alert",
    statusText: "Thermal Variance Detected",
    metric: "97% (Dynamic Recalibrating)",
  },
  {
    id: 2,
    stationId: 7,
    label: "ST07 Robotic Assembly Alpha",
    code: "ST07-ARM1",
    xPercent: 35.5,
    yPercent: 38.0,
    type: "robot",
    statusText: "Torque 142 Nm • 0.02s Cycle",
    metric: "95% Efficiency",
  },
  {
    id: 3,
    stationId: 8,
    label: "ST08 Robotic Welding Beta",
    code: "ST08-ARM2",
    xPercent: 71.0,
    yPercent: 39.5,
    type: "robot",
    statusText: "Fiber Laser 4.2 kW Active",
    metric: "91% Efficiency",
  },
  {
    id: 4,
    stationId: 6,
    label: "ST06 Telemetry Core & QA",
    code: "ST06-DASH",
    xPercent: 86.5,
    yPercent: 28.0,
    type: "monitor",
    statusText: "Line Telemetry: 87% Throughput",
    metric: "87% Line Health",
  },
  {
    id: 5,
    stationId: 20,
    label: "ST20 AGV Chassis Conveyor",
    code: "ST20-AGV",
    xPercent: 44.0,
    yPercent: 56.5,
    type: "conveyor",
    statusText: "Speed: 1.2 m/s • Auto-Guided",
    metric: "96% Active",
  },
  {
    id: 6,
    stationId: 15,
    label: "ST15 Finished Assembly Line",
    code: "ST15-ENC",
    xPercent: 80.0,
    yPercent: 72.0,
    type: "conveyor",
    statusText: "Outbound Dispatch Track",
    metric: "94% Output",
  },
];

const viewAngles = [
  { name: "Main Robotic Assembly Line (ST24 Focus)", mode: "Live Factory Stream" },
  { name: "Sub-Assembly & Laser Welding Rig", mode: "Thermal & Laser Telemetry" },
  { name: "Outbound Autonomous AGV Conveyor", mode: "LiDAR Transit Tracking" },
];

export default function DigitalTwinHero({ onNavigateToStations }: DigitalTwinHeroProps) {
  const [activeHotspotId, setActiveHotspotId] = useState<number | null>(1); // Default to ST24 Alert
  const [currentAngleIndex, setCurrentAngleIndex] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(true);

  const activeHotspot = factoryHotspots.find((h) => h.id === activeHotspotId);
  const associatedStation = activeHotspot
    ? defaultStations.find((s: StationItem) => s.id === activeHotspot.stationId)
    : null;

  const nextAngle = () => {
    setCurrentAngleIndex((prev) => (prev + 1) % viewAngles.length);
  };

  const prevAngle = () => {
    setCurrentAngleIndex((prev) => (prev - 1 + viewAngles.length) % viewAngles.length);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline & Action Controls */}
          <div className="lg:col-span-4 flex flex-col justify-center space-y-6 z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-400 w-fit backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              DIGITAL TWIN FACTORY 4.0
            </div>

            {/* Main Headline styled exactly as in the visual */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight font-sans text-white leading-none">
                See.
              </h1>
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-300 bg-clip-text text-transparent leading-none">
                Predict.
              </h1>
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight font-sans bg-gradient-to-r from-teal-300 via-cyan-400 to-emerald-400 bg-clip-text text-transparent leading-none">
                Act.
              </h1>
            </div>

            {/* Body Copy */}
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Real-time 3D telemetry, robotic line automation, and autonomous digital twin monitoring across 24 connected production stations.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                onClick={() => onNavigateToStations(activeHotspot?.stationId || 24)}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold px-6 shadow-[0_0_25px_rgba(99,102,241,0.5)] rounded-2xl flex items-center gap-2 group transition-all duration-300"
              >
                <span>Explore Stations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                onClick={() => onNavigateToStations(undefined)}
                variant="outline"
                size="lg"
                className="border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold rounded-2xl flex items-center gap-2 backdrop-blur-md"
              >
                <Orbit className="w-4 h-4 text-cyan-400" />
                <span>24-Station Orbit</span>
              </Button>
            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800/80">
              <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                <span className="block text-[10px] uppercase font-mono text-slate-400">Stations</span>
                <span className="text-base font-bold text-cyan-300 font-mono">24 Active</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                <span className="block text-[10px] uppercase font-mono text-slate-400">Telemetry</span>
                <span className="text-base font-bold text-indigo-300 font-mono">0.2ms Sync</span>
              </div>
              <div className="bg-slate-900/50 p-2.5 rounded-xl border border-slate-800/80">
                <span className="block text-[10px] uppercase font-mono text-slate-400">Line Health</span>
                <span className="text-base font-bold text-emerald-300 font-mono">98.4%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Digital Twin Factory Image */}
          <div className="lg:col-span-8 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.15)] group">
              
              {/* Top Image Telemetry Bar */}
              <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 bg-slate-950/70 backdrop-blur-md border-b border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono text-[11px] text-emerald-300 font-semibold uppercase">
                    {viewAngles[currentAngleIndex].mode}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
                    {viewAngles[currentAngleIndex].name}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsScanning(!isScanning)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${
                      isScanning
                        ? "border-cyan-500/40 bg-cyan-950/50 text-cyan-300"
                        : "border-slate-800 text-slate-400"
                    }`}
                  >
                    {isScanning ? "SCANNER ON" : "SCANNER OFF"}
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                    FEED #0{currentAngleIndex + 1}
                  </span>
                </div>
              </div>

              {/* Main Factory Image Container */}
              <div className="relative w-full aspect-[16/10] select-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/factory-hero.jpg"
                  alt="Digital Twin 3D Factory Assembly Line"
                  className="w-full h-full object-cover object-center"
                />

                {/* Laser Scanning Grid Line Overlay Animation */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>
                )}

                {/* Interactive Hotspot Pins & Overlays */}
                {factoryHotspots.map((hotspot) => {
                  const isActive = activeHotspotId === hotspot.id;
                  const isAlert = hotspot.type === "alert";

                  return (
                    <div
                      key={hotspot.id}
                      className="absolute z-30 cursor-pointer -translate-x-1/2 -translate-y-1/2 group/pin"
                      style={{
                        left: `${hotspot.xPercent}%`,
                        top: `${hotspot.yPercent}%`,
                      }}
                      onClick={() => setActiveHotspotId(isActive ? null : hotspot.id)}
                    >
                      {/* Holographic Box for ST24 matching the user image style */}
                      {isAlert ? (
                        <div className="relative flex flex-col items-center">
                          <div
                            className={`px-2.5 py-1 rounded-lg border-2 font-mono font-bold text-xs flex items-center gap-1.5 transition-all duration-300 shadow-xl ${
                              isActive
                                ? "bg-amber-500/90 text-slate-950 border-white scale-110 shadow-[0_0_25px_rgba(245,158,11,0.8)]"
                                : "bg-slate-950/90 text-amber-300 border-amber-400/90 hover:scale-105 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                            }`}
                          >
                            <span>ST24</span>
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                          </div>

                          {/* Holographic 3D Glass Box projection around the node */}
                          <div className="w-16 h-16 -mt-1 border border-amber-400/60 bg-amber-500/10 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.2)] animate-pulse pointer-events-none flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4 text-amber-400/70" />
                          </div>
                        </div>
                      ) : (
                        /* Standard Node Pin */
                        <div className="relative flex items-center justify-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center border-2 font-mono text-[10px] font-bold transition-all duration-300 shadow-md ${
                              isActive
                                ? "bg-cyan-400 text-slate-950 border-white scale-125 shadow-[0_0_20px_rgba(56,189,248,0.9)]"
                                : "bg-slate-950/80 text-cyan-300 border-cyan-400/70 hover:scale-110 hover:border-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                            }`}
                          >
                            <span>{hotspot.stationId}</span>
                          </div>

                          {/* Pulse aura */}
                          <div className="absolute w-10 h-10 rounded-full border border-cyan-400/30 animate-ping pointer-events-none" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Left & Right Carousel Navigation Arrows */}
                <button
                  onClick={prevAngle}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 z-20"
                  title="Previous Angle"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextAngle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-white flex items-center justify-center shadow-xl backdrop-blur-md transition-all hover:scale-110 z-20"
                  title="Next Angle"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Pop-up Telemetry Card when any hotspot is active */}
                {activeHotspot && associatedStation && (
                  <Card
                    className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-84 bg-slate-950/95 backdrop-blur-2xl border-cyan-500/50 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.25)] z-40 text-slate-100 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CardHeader className="p-3.5 pb-2 border-b border-slate-800/80 bg-gradient-to-r from-slate-900 to-slate-950">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex items-center justify-center w-6 h-6 rounded-md font-mono font-bold text-xs ${
                              activeHotspot.type === "alert"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                            }`}
                          >
                            #{associatedStation.stationNumber}
                          </span>
                          <div>
                            <CardTitle className="text-xs font-bold text-white tracking-wide">
                              {associatedStation.name}
                            </CardTitle>
                            <CardDescription className="text-[9px] font-mono text-cyan-400/80">
                              {activeHotspot.code} • {associatedStation.zone}
                            </CardDescription>
                          </div>
                        </div>

                        {activeHotspot.type === "alert" ? (
                          <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40 text-[9px]">
                            ALERT ACTIVE
                          </Badge>
                        ) : (
                          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-[9px]">
                            ONLINE
                          </Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="p-3.5 space-y-2.5 text-xs">
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {associatedStation.description}
                      </p>

                      <div className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                        <span className="text-slate-400">Live Status</span>
                        <span className="font-mono font-bold text-cyan-300">{activeHotspot.statusText}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <Button
                          size="sm"
                          onClick={() => onNavigateToStations(associatedStation.id)}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold h-7 text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
                        >
                          <span>Open in 24-Station Orbit</span>
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Bottom Interactive Bar */}
              <div className="px-4 py-2.5 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="text-[11px]">Click on any node pin (e.g. <strong className="text-amber-300">ST24</strong>, Robotic Arms, Telemetry Monitor) to inspect live digital twin sensors.</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onNavigateToStations(24)}
                    className="h-6 px-2 text-[10px] font-mono text-amber-300 hover:text-amber-200 hover:bg-amber-950/40 border border-amber-500/30 rounded-lg flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span>Inspect ST24 Alert</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <Badge variant="outline" className="text-xs font-mono border-indigo-500/30 text-indigo-300 mb-2">
            INTELLIGENT TELEMETRY INFRASTRUCTURE
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Complete Factory Digital Twin Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Synchronize physical manufacturing robots with concentric orbital station simulation in sub-millisecond real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-cyan-500/40 transition-all rounded-2xl">
            <CardHeader className="p-5 pb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-3">
                <Eye className="w-5 h-5" />
              </div>
              <CardTitle className="text-base text-white">See Everything Live</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                High-fidelity 3D digital twin visualization mapping all physical robot arms, conveyor AGVs, and assembly stations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-indigo-500/40 transition-all rounded-2xl">
            <CardHeader className="p-5 pb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <CardTitle className="text-base text-white">Predict Anomalies Early</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                AI feedback loop at Station 24 anticipates thermal variances, torque stress, and bottlenecks before line downtime occurs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900/40 backdrop-blur-md border-slate-800 hover:border-purple-500/40 transition-all rounded-2xl">
            <CardHeader className="p-5 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <CardTitle className="text-base text-white">Act with Precision</CardTitle>
              <CardDescription className="text-xs text-slate-400">
                Concentric 3-ring orbital command enables granular control across Inner Core, Fabrication, and Logistics stages.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}