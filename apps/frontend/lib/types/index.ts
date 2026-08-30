export type ZoneType = "Body Construction" | "Paint" | "Final Assembly";
export type HealthStatus = "online" | "warning" | "critical";
export type InstrumentationLevel = "Full" | "Partial" | "Manual";
export type ConfidenceLevel = "High" | "Med" | "Low";

export interface SensorMetric {
  name: string;
  value: string;
  baseline: string;
  unit: string;
  isNominal: boolean;
}

export interface Station {
  id: number;
  stationNumber: number;
  name: string;
  code: string;
  zone: ZoneType;
  orbitRing: 1 | 2 | 3;
  health: HealthStatus;
  instrumentation: InstrumentationLevel;
  instrumentationDetails: string;
  description: string;
  riskScore: number;
  confidence: ConfidenceLevel;
  activeAlert?: string;
  sensors?: SensorMetric[];
  sparklineHistory?: number[];
  predictedImpact?: string;
  nextMaintenance: string;
  manualLog?: string;
  proposedSensorUpgrade?: string;
  sensedVsInferred?: {
    sensed: string[];
    inferred: string[];
  };
  upstreamIds: number[];
  downstreamIds: number[];
}

export interface DefectTraceEvent {
  id: string;
  code: string;
  title: string;
  originStationId: number;
  currentStationId: number;
  status: "Open" | "Investigating" | "Resolved";
  severity: "Critical" | "Warning" | "Minor";
  propagationPath: {
    stationId: number;
    health: HealthStatus;
    hopConfidence: number;
    sensorSnapshot: string;
  }[];
  summary: string;
  multiCause: {
    cause: string;
    percentage: number;
  }[];
  sensorEvidence: {
    stationId: number;
    stationName: string;
    metric: string;
    measuredValue: string;
    nominalBand: string;
    deviation: string;
  }[];
  modelConfidence: number;
  validationCaseCount: number;
  recommendation: {
    action: string;
    priority: "High" | "Med" | "Low";
    expectedImpact: string;
  };
}

export interface PredictionItem {
  id: string;
  stationId: number;
  stationName: string;
  stationCode: string;
  zone: ZoneType;
  defectType: string;
  riskScore: number;
  health: HealthStatus;
  confidence: ConfidenceLevel;
  timeToFailure: string;
  recommendationSummary: string;
  expectedImpact: string;
  defectTraceId: string;
}

export interface ActionItem {
  id: string;
  stationId: number;
  stationName: string;
  stationCode: string;
  zone: ZoneType;
  recommendedAction: string;
  priority: "High" | "Med" | "Low";
  expectedImpact: string;
  defectTraceId: string;
  status: "Pending" | "Approved" | "Dismissed";
  timestamp: string;
  decidedBy?: string;
  decidedAt?: string;
}