"use client";
import React from "react";
import HelixChronoMatrix from "@/components/ui/helix-chrono-matrix";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { Calendar, Code, FileText, User, Clock } from "lucide-react";

const timelineData = [
  {
    id: 1,
    title: "Body Construction",
    date: "Stage 01",
    content: "Underbody framing and roof laser welding.",
    category: "Zone 1",
    icon: Calendar,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Paint Application",
    date: "Stage 02",
    content: "E-coat pre-treat and automated basecoat spray.",
    category: "Zone 2",
    icon: FileText,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Final Assembly",
    date: "Stage 03",
    content: "Powertrain marriage and deluge leak test.",
    category: "Zone 3",
    icon: Code,
    relatedIds: [2],
    status: "in-progress" as const,
    energy: 60,
  },
];

export function RadialOrbitalTimelineDemo() {
  return <RadialOrbitalTimeline timelineData={timelineData} />;
}

export function HelixChronoMatrixDemo() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white dark:bg-black transition-colors duration-300">
      <HelixChronoMatrix />
    </div>
  );
}

export default HelixChronoMatrixDemo;