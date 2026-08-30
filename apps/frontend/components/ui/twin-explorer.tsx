"use client";
import React, { useState } from "react";
import InteractiveFactoryScene from "@/components/ui/interactive-factory-scene";
import ConcentricOrbitalStations from "@/components/ui/concentric-orbital-stations";
import { RadialOrbitalTimelineDemo } from "@/components/ui/demo";

export interface TwinExplorerProps {
  initialTab?: "factory-scene" | "stations-orbit" | "timeline";
  onBackToLanding: () => void;
}

export default function TwinExplorer({
  initialTab = "factory-scene",
  onBackToLanding,
}: TwinExplorerProps) {
  const [activeTab, setActiveTab] = useState<"factory-scene" | "stations-orbit" | "timeline">(initialTab);
  const [focusedStationId, setFocusedStationId] = useState<number | null>(null);

  const handleExploreStations = (stationId?: number) => {
    if (stationId) {
      setFocusedStationId(stationId);
    }
    setActiveTab("stations-orbit");
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {activeTab === "factory-scene" && (
        <InteractiveFactoryScene onExploreStations={handleExploreStations} />
      )}

      {activeTab === "stations-orbit" && (
        <ConcentricOrbitalStations
          initialSelectedStationId={focusedStationId}
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === "timeline" && (
        <div className="w-full min-h-screen flex items-center justify-center bg-slate-100">
          <RadialOrbitalTimelineDemo />
        </div>
      )}
    </div>
  );
}