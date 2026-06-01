export type AutomationStatus = "ready" | "running" | "success" | "attention";

export type ImpactLevel = "high" | "medium" | "critical";

export type LogSeverity = "info" | "success" | "warning" | "error";

export type InsightSeverity = "low" | "medium" | "high";

export type InsightCategory =
  | "eficiencia"
  | "qualidade de dados"
  | "risco operacional"
  | "produtividade"
  | "relatorio"
  | "governanca";

export interface ExecutionLog {
  timestamp: string;
  type: LogSeverity;
  message: string;
  severity: LogSeverity;
  step: string;
}

export interface GeneratedFile {
  id: string;
  name: string;
  type: "CSV" | "JSON" | "HTML" | "CHECKLIST";
  size: string;
  generatedAt: string;
  automationSlug: string;
  href: string;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  severity: InsightSeverity;
  category: InsightCategory;
  recommendation: string;
}

export interface CorrectionRule {
  field: string;
  original: string;
  correction: string;
  rule: string;
  impact: string;
}

export interface AutomationKpi {
  label: string;
  value: string;
  delta: string;
  tone: "green" | "blue" | "amber" | "rose";
}

export interface ErrorTypeMetric {
  name: string;
  value: number;
}

export interface Automation {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  problem: string;
  status: AutomationStatus;
  impact: ImpactLevel;
  manualTimeHours: number;
  automatedTimeHours: number;
  estimatedSavingsHours: number;
  estimatedSavingsBRL: number;
  processedRecords: number;
  fixedIssues: number;
  duplicatesRemoved: number;
  standardizedFields: number;
  qualityBefore: number;
  qualityAfter: number;
  reworkReduction: number;
  errorTypes: ErrorTypeMetric[];
  timeline: string[];
  rules: CorrectionRule[];
  kpis: AutomationKpi[];
  files: GeneratedFile[];
}

export interface DatasetRecord {
  id: string;
  inconsistencies?: string[];
  corrections?: string[];
  [key: string]: string | number | string[] | undefined;
}

export interface ExecutionHistoryEntry {
  month: string;
  runs: number;
  records: number;
  hoursSaved: number;
  savingsBRL: number;
  qualityScore: number;
}

export interface AutomationRunResult {
  automationId: string;
  status: "success" | "error";
  durationMs: number;
  processedRecords: number;
  fixedIssues: number;
  beforeQualityScore: number;
  afterQualityScore: number;
  logs: ExecutionLog[];
  insights: Insight[];
  files: GeneratedFile[];
}

export interface DashboardMetrics {
  totalExecutions: number;
  processedRecords: number;
  fixedIssues: number;
  duplicatesRemoved: number;
  standardizedFields: number;
  hoursSaved: number;
  operationalSavingsBRL: number;
  averageQualityBefore: number;
  averageQualityAfter: number;
  averageQualityScore: number;
  reworkReduction: number;
}
