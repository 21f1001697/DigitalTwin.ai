"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, ArrowRight, Activity, AlertTriangle, CheckCircle2, ChevronRight, 
  Cpu, Layers, Link as LinkIcon, Pause, Play, RotateCcw, Shield, Sparkles, 
  Wrench, Eye, Check, Clock, Radio, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StationItem, productionStations, ZoneType } from "@/components/ui/stations-data";
import { 
  StatusPill, InstrumentationBadge, HealthDot, MetricCard, 
  ProgressStat, LinkChip, MiniSparkline 
} from "@/components/ui/station-orbit-primitives";

export interface ConcentricOrbitalStationsProps {
  stations?: StationItem[];
  initialSelectedStationId?: number | null;
  onNavigateTab?: (tab: "factory-scene" | "stations-orbit" | "timeline") => void;
  showHeader?: boolean;
}

const ZONE_CONFIG = {
  1: {
    name: "Body Construction",
    ringLabel: "Inner Ring",
    radius: 145,
    baseSpeed: 0.20,
    borderColor: "border-cyan-400/70",
    orbitGlow: "rgba(6, 182, 212, 0.15)",
    badgeColor: "text-cyan-900 border-cyan-300 bg-cyan-50",
    nodeBorder: "border-cyan-500",
  },
  2: {
    name: "Paint",
    ringLabel: "Middle Ring",
    radius: 245,
    baseSpeed: 0.14,
    borderColor: "border-amber-400/70",
    orbitGlow: "rgba(245, 158, 11, 0.12)",
    badgeColor: "text-amber-900 border-amber-300 bg-amber-50",
    nodeBorder: "border-amber-500",
  },
  3: {
    name: "Final Assembly",
    ringLabel: "Outer Ring",
    radius: 345,
    baseSpeed: 0.09,
    borderColor: "border-purple-400/60",
    orbitGlow: "rgba(168, 85, 247, 0.10)",
    badgeColor: "text-purple-900 border-purple-300 bg-purple-50",
    nodeBorder: "border-purple-500",
  },
};

export default function ConcentricOrbitalStations({
  stations = productionStations,
  initialSelectedStationId = null,
  onNavigateTab,
  showHeader = false,
}: ConcentricOrbitalStationsProps) {
  const [activeStationId, setActiveStationId] = useState<number | null>(initialSelectedStationId || null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [rotationAngles, setRotationAngles] = useState<Record<number, number>>({
    1: 15,
    2: 45,
    3: 75,
  });
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [filterRing, setFilterRing] = useState<number | "all">("all");
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSelectedStationId) {
      setActiveStationId(initialSelectedStationId);
      const st = stations.find((s) => s.id === initialSelectedStationId);
      if (st) {
        const pulsing: Record<number, boolean> = { [st.id]: true };
        st.upstreamIds.forEach((id) => (pulsing[id] = true));
        st.downstreamIds.forEach((id) => (pulsing[id] = true));
        setPulseEffect(pulsing);
      }
    }
  }, [initialSelectedStationId, stations]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngles((prev) => ({
          1: (prev[1] + ZONE_CONFIG[1].baseSpeed) % 360,
          2: (prev[2] + ZONE_CONFIG[2].baseSpeed) % 360,
          3: (prev[3] + ZONE_CONFIG[3].baseSpeed) % 360,
        }));
      }, 40);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoRotate]);

  const handleStationClick = (station: StationItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (activeStationId === station.id) {
      setActiveStationId(null);
      setPulseEffect({});
    } else {
      setActiveStationId(station.id);

      const pulsing: Record<number, boolean> = { [station.id]: true };
      station.upstreamIds.forEach((id) => (pulsing[id] = true));
      station.downstreamIds.forEach((id) => (pulsing[id] = true));
      setPulseEffect(pulsing);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setActiveStationId(null);
      setPulseEffect({});
    }
  };

  const ring1Stations = stations.filter((s) => s.orbitRing === 1);
  const ring2Stations = stations.filter((s) => s.orbitRing === 2);
  const ring3Stations = stations.filter((s) => s.orbitRing === 3);

  const activeStation = stations.find((s) => s.id === activeStationId);

  const getNodeBorderColor = (orbitRing: 1 | 2 | 3) => {
    switch (orbitRing) {
      case 1:
        return "border-cyan-500";
      case 2:
        return "border-amber-500";
      case 3:
      default:
        return "border-purple-500";
    }
  };

  const getNodeHealthFill = (health: StationItem["health"], isExpanded: boolean, isRelated: boolean) => {
    if (isExpanded) {
      return "bg-slate-900 text-white ring-4 ring-indigo-400 shadow-xl scale-125 z-50 font-black";
    }
    if (isRelated) {
      return "bg-indigo-50 text-slate-900 shadow-lg scale-110 z-40 ring-2 ring-indigo-300";
    }

    switch (health) {
      case "critical":
        return "bg-rose-50 text-rose-950 hover:bg-rose-100";
      case "warning":
        return "bg-amber-50 text-amber-950 hover:bg-amber-100";
      case "online":
      default:
        return "bg-white text-slate-900 hover:bg-slate-50";
    }
  };

  const triggerAction = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleBackgroundClick}
      className="relative w-full min-h-[calc(100vh-120px)] bg-[#f8fafc] text-slate-800 flex flex-col justify-between overflow-hidden select-none font-sans"
    >
      {/* Background Ambience Texture (Original Light Palette) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,rgba(6,182,212,0.04)_40%,transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      {/* Orbit Canvas Controls Bar */}
      <div className="relative z-30 w-full px-6 py-3 flex items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        
        {/* Left: Zone Ring filter counts */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilterRing("all")}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              filterRing === "all" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            All (20)
          </button>
          <button
            onClick={() => setFilterRing(1)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              filterRing === 1 ? "bg-cyan-100 text-cyan-900 shadow-2xs" : "text-cyan-700 hover:text-cyan-900"
            }`}
          >
            Inner ({ring1Stations.length})
          </button>
          <button
            onClick={() => setFilterRing(2)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              filterRing === 2 ? "bg-amber-100 text-amber-900 shadow-2xs" : "text-amber-700 hover:text-amber-900"
            }`}
          >
            Middle ({ring2Stations.length})
          </button>
          <button
            onClick={() => setFilterRing(3)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              filterRing === 3 ? "bg-purple-100 text-purple-900 shadow-2xs" : "text-purple-700 hover:text-purple-900"
            }`}
          >
            Outer ({ring3Stations.length})
          </button>
        </div>

        {/* Right: Rotate Toggle & Reset Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAutoRotate(!autoRotate)}
            className="border-slate-300 bg-white hover:bg-slate-50 text-xs text-slate-800 font-bold flex items-center gap-1.5 rounded-xl shadow-2xs cursor-pointer"
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5 text-indigo-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
            <span>{autoRotate ? "Pause Orbit" : "Rotate Orbit"}</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setActiveStationId(null);
              setPulseEffect({});
              setAutoRotate(false);
              setRotationAngles({ 1: 15, 2: 45, 3: 75 });
            }}
            className="border-slate-300 bg-white hover:bg-slate-50 text-xs text-slate-700 rounded-xl shadow-2xs cursor-pointer"
            title="Reset telemetry view"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionNotice && (
        <div className="fixed top-24 right-8 z-50 bg-slate-900 text-white text-xs font-mono py-2 px-4 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* MAIN CANVAS */}
      <main className="relative z-10 w-full flex-1 flex items-center justify-center min-h-[740px]">
        <div className="relative w-[760px] h-[760px] flex items-center justify-center">
          
          {/* Central Reactor Core */}
          <div className="absolute z-20 flex flex-col items-center justify-center pointer-events-none">
            <div className="relative w-18 h-18 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-[0_0_30px_rgba(99,102,241,0.25)] animate-pulse">
              <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border border-slate-200">
                <Cpu className="w-6 h-6 text-indigo-600" />
                <span className="text-[8px] font-mono tracking-widest text-indigo-600 uppercase mt-0.5 font-extrabold">LINE CORE</span>
              </div>
            </div>
            <div className="absolute w-28 h-28 rounded-full border border-indigo-400/20 animate-ping opacity-30 pointer-events-none" />
            <div className="absolute w-36 h-36 rounded-full border border-cyan-400/20 animate-pulse pointer-events-none" />
          </div>

          {/* 3 Concentric Production Zone Rings */}
          {[1, 2, 3].map((ringNum) => {
            const config = ZONE_CONFIG[ringNum as 1 | 2 | 3];
            const radius = config.radius;
            const diameter = radius * 2;
            const isDimmed = filterRing !== "all" && filterRing !== ringNum;

            return (
              <div
                key={`production-zone-${ringNum}`}
                className={`absolute rounded-full border-2 transition-all duration-500 pointer-events-none ${
                  isDimmed
                    ? "border-slate-300/30 opacity-15"
                    : `${config.borderColor} shadow-[0_0_20px_${config.orbitGlow}]`
                }`}
                style={{
                  width: `${diameter}px`,
                  height: `${diameter}px`,
                }}
              >
                {/* Zone Label Pill on Ring */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 border rounded-full text-[9px] font-mono font-extrabold tracking-wider shadow-xs ${config.badgeColor}`}>
                  {config.name} ({ringNum === 1 ? ring1Stations.length : ringNum === 2 ? ring2Stations.length : ring3Stations.length})
                </div>
              </div>
            );
          })}

          {/* 20 Station Nodes across the 3 Production Zones */}
          {[1, 2, 3].map((ringNum) => {
            const ringStations = stations.filter((s) => s.orbitRing === ringNum);
            const radius = ZONE_CONFIG[ringNum as 1 | 2 | 3].radius;
            const currentRotation = rotationAngles[ringNum] || 0;
            const isDimmed = filterRing !== "all" && filterRing !== ringNum;

            return ringStations.map((station, index) => {
              const totalInRing = ringStations.length;
              const angleDeg = ((index / totalInRing) * 360 + currentRotation) % 360;
              const radian = (angleDeg * Math.PI) / 180;
              const x = radius * Math.cos(radian);
              const y = radius * Math.sin(radian);

              const isExpanded = activeStationId === station.id;
              const isUpstream = activeStation ? activeStation.upstreamIds.includes(station.id) : false;
              const isDownstream = activeStation ? activeStation.downstreamIds.includes(station.id) : false;
              const isRelated = isUpstream || isDownstream;
              const isPulsing = pulseEffect[station.id];

              const zIndex = isExpanded ? 50 : isRelated ? 40 : 30;

              return (
                <div
                  key={station.id}
                  className={`absolute transition-all duration-300 cursor-pointer ${
                    isDimmed ? "opacity-15 pointer-events-none scale-75" : "opacity-100"
                  }`}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    zIndex,
                  }}
                  onClick={(e) => handleStationClick(station, e)}
                >
                  <div
                    className={`absolute -inset-2 rounded-full transition-all duration-500 pointer-events-none ${
                      isPulsing
                        ? station.health === "critical"
                          ? "animate-ping opacity-60 bg-rose-500"
                          : station.health === "warning"
                          ? "animate-ping opacity-60 bg-amber-500"
                          : "animate-ping opacity-50 bg-indigo-500"
                        : "opacity-0"
                    }`}
                  />

                  {/* Station Node: Border Color = Zone, Center Fill = Health */}
                  <div
                    className={`relative w-11 h-11 rounded-full flex flex-col items-center justify-center font-mono font-bold text-xs border-[2.5px] transition-all duration-300 shadow-md ${getNodeBorderColor(
                      station.orbitRing
                    )} ${getNodeHealthFill(station.health, isExpanded, isRelated)}`}
                  >
                    <div className="absolute top-0.5 right-0.5">
                      <HealthDot health={station.health} />
                    </div>

                    <span className="text-xs tracking-tight font-black leading-none">
                      {station.stationNumber < 10 ? `0${station.stationNumber}` : station.stationNumber}
                    </span>
                    <span className="text-[7px] font-sans uppercase font-bold opacity-75 leading-none mt-0.5">ST</span>
                  </div>

                  {/* Station Name Label below circle */}
                  <div
                    className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md transition-all duration-200 pointer-events-none shadow-2xs ${
                      isExpanded
                        ? "bg-slate-900 text-white scale-110 shadow-md border border-slate-800"
                        : isRelated
                        ? isUpstream
                          ? "bg-cyan-100 text-cyan-950 border border-cyan-300 font-extrabold"
                          : "bg-purple-100 text-purple-950 border border-purple-300 font-extrabold"
                        : "bg-white/95 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {station.name}
                  </div>

                  {/* STATION DETAIL PANEL (Modal) */}
                  {isExpanded && (
                    <Card
                      className="absolute top-16 left-1/2 -translate-x-1/2 w-[340px] sm:w-[380px] bg-white/95 backdrop-blur-2xl border-slate-300/90 shadow-[0_20px_50px_rgba(15,23,42,0.2)] z-50 text-slate-900 rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-slate-900 shadow-sm"></div>

                      <CardHeader className="p-4 pb-3 border-b border-slate-100 bg-slate-50/90">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-white font-mono font-black text-xs shadow-xs">
                              #{station.stationNumber < 10 ? `0${station.stationNumber}` : station.stationNumber}
                            </span>
                            <div>
                              <CardTitle className="text-sm font-black text-slate-900 tracking-wide flex items-center gap-1.5">
                                <span>{station.name}</span>
                              </CardTitle>
                              <CardDescription className="text-[10px] font-mono text-slate-500 font-bold">
                                CODE: {station.code} • {station.zone}
                              </CardDescription>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1">
                            <StatusPill status={station.health} />
                            <InstrumentationBadge level={station.instrumentation} />
                          </div>
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed pt-2">
                          {station.description}
                        </p>
                      </CardHeader>

                      <CardContent className="p-4 space-y-3.5 text-xs max-h-[380px] overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2">
                          <MetricCard label="Zone / Stage" value={station.zone} subtext={`Orbit Ring 0${station.orbitRing}`} />
                          <MetricCard label="Instrumentation Level" value={station.instrumentationDetails} />
                        </div>

                        <ProgressStat score={station.riskScore} />

                        {station.sensors && station.sensors.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                              Live Sensed Telemetry vs Baseline
                            </span>
                            <div className="grid grid-cols-2 gap-1.5">
                              {station.sensors.map((sensor, idx) => (
                                <div
                                  key={idx}
                                  className={`p-2 rounded-xl border text-[10px] font-mono flex items-center justify-between ${
                                    sensor.isNominal
                                      ? "bg-slate-50 border-slate-200/80 text-slate-700"
                                      : "bg-amber-50 border-amber-300 text-amber-950 font-bold"
                                  }`}
                                >
                                  <div>
                                    <span className="text-[9px] text-slate-400 block truncate">{sensor.name}</span>
                                    <span className="font-bold">{sensor.value} {sensor.unit}</span>
                                  </div>
                                  <span className="text-[9px] text-slate-400">Base: {sensor.baseline}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {station.manualLog && (
                          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                            <span className="text-[9px] font-mono uppercase font-bold text-slate-400 block mb-1">
                              Last Operator Log Entry
                            </span>
                            <p className="italic font-mono text-[10px] text-slate-800">"{station.manualLog}"</p>
                          </div>
                        )}

                        {station.sparklineHistory && (
                          <MiniSparkline points={station.sparklineHistory} />
                        )}

                        <div className="space-y-1.5 pt-1 text-[11px]">
                          {station.predictedImpact && (
                            <div className="flex items-start gap-1.5 text-slate-700 bg-indigo-50/60 p-2 rounded-xl border border-indigo-100">
                              <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-[10px] font-mono uppercase text-indigo-800 block">Downstream Impact Prediction:</span>
                                <span className="text-[10px]">{station.predictedImpact}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[10px] font-mono p-2 rounded-xl bg-slate-50 border border-slate-200">
                            <span className="text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> Next Maintenance Window:
                            </span>
                            <span className="font-bold text-slate-800">{station.nextMaintenance}</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                            <LinkIcon className="w-3 h-3 text-indigo-500" /> Propagation Chain Links:
                          </div>

                          <div className="space-y-1.5 text-[10px]">
                            {station.upstreamIds.length > 0 && (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-slate-400 font-mono font-bold text-[9px] w-18">Upstream:</span>
                                {station.upstreamIds.map((uId) => {
                                  const uSt = stations.find((s) => s.id === uId);
                                  if (!uSt) return null;
                                  return (
                                    <LinkChip
                                      key={uId}
                                      stationNumber={uSt.stationNumber}
                                      name={uSt.name}
                                      onClick={() => handleStationClick(uSt)}
                                    />
                                  );
                                })}
                              </div>
                            )}

                            {station.downstreamIds.length > 0 && (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-slate-400 font-mono font-bold text-[9px] w-18">Downstream:</span>
                                {station.downstreamIds.map((dId) => {
                                  const dSt = stations.find((s) => s.id === dId);
                                  if (!dSt) return null;
                                  return (
                                    <LinkChip
                                      key={dId}
                                      stationNumber={dSt.stationNumber}
                                      name={dSt.name}
                                      isDownstream
                                      onClick={() => handleStationClick(dSt)}
                                    />
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() => triggerAction(`Full Defect Trace opened for #${station.code}`)}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-8 text-[11px] rounded-xl shadow-xs cursor-pointer"
                          >
                            <span>View Full Trace</span>
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => triggerAction(`Telemetry acknowledged for #${station.code}`)}
                            className="border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold h-8 text-[11px] rounded-xl shadow-2xs cursor-pointer"
                          >
                            <Check className="w-3 h-3 text-emerald-600 mr-1" />
                            <span>Acknowledge</span>
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => triggerAction(`Station #${station.code} flagged in Insights Actions Queue`)}
                            className="border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold h-8 text-[11px] rounded-xl shadow-2xs cursor-pointer"
                            title="Flag for maintenance"
                          >
                            <Wrench className="w-3 h-3 text-amber-600" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            });
          })}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full px-4 sm:px-8 py-3 bg-white/90 backdrop-blur-xl border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-[11px] font-mono font-bold">
          <span className="text-slate-400 uppercase text-[9px]">Zones (Borders):</span>
          <div className="flex items-center gap-1.5 text-cyan-800">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-cyan-500 bg-white"></span> Body Construction (6)
          </div>
          <div className="flex items-center gap-1.5 text-amber-800">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-amber-500 bg-white"></span> Paint (7)
          </div>
          <div className="flex items-center gap-1.5 text-purple-800">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-purple-500 bg-white"></span> Final Assembly (7)
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono font-semibold">
          <span className="text-slate-400 uppercase text-[9px]">Live Health (Center):</span>
          <div className="flex items-center gap-1 text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online
          </div>
          <div className="flex items-center gap-1 text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning (ST03, ST08, ST16)
          </div>
          <div className="flex items-center gap-1 text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Critical (ST10)
          </div>
        </div>
      </footer>
    </div>
  );
}