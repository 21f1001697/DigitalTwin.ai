"use client";
import React, { useState } from "react";
import ConcentricOrbitalStations from "@/components/ui/concentric-orbital-stations";
import { StationDrawer } from "@/components/station/StationDrawer";
import { STATIONS } from "@/lib/data";
import { Station } from "@/lib/types";

export function StationOrbit({ onNavigateTab }: { onNavigateTab?: (tab: any) => void }) {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const handleSelectStationId = (stationId: number) => {
    const st = STATIONS.find((s) => s.id === stationId);
    if (st) setSelectedStation(st);
  };

  return (
    <div className="relative w-full min-h-screen">
      <ConcentricOrbitalStations
        stations={STATIONS}
        onNavigateTab={onNavigateTab || (() => {})}
      />

      {selectedStation && (
        <StationDrawer
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
          onSelectStation={handleSelectStationId}
        />
      )}
    </div>
  );
}

export default StationOrbit;