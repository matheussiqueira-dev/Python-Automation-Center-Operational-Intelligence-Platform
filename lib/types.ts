export type AutomationStatus = "ready" | "running" | "success" | "attention";

export type ImpactLevel = "high" | "medium" | "critical";

export type ComplexityLevel = "low" | "medium" | "high";

export type ExecutionStatus = "queued" | "running" | "completed" | "failed";

export type ViewMode = "executive" | "technical";

export type LogSeverity = "info" | "success" | "warning" | "error";

export type InsightSeverity = "low" | "medium" | "high";
export type DataQualitySeverity = "baixo" | "medio" | "alto" | "critico";
export type DataQualityIssueType =
  | "nulo"
  | "duplicidade"
  | "tipo_invalido"
  | "data_invalida"
  | "valor_negativo"
  | "obrigatorio_ausente"
  | "outlier"
  | "texto_inconsistente";

export type InsightCategory =
  | "eficiencia"
  | "qualidade de dados"
  | "risco operacional"
  | "produtividade"
  | "relatorio"
  | "governanca"
  | "financeiro";

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
  type: "CSV" | "JSON" | "HTML" | "CHECKLIST" | "LOG";
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
  estimatedImpact?: string;
}

export interface CorrectionRule {
  field: string;
  original: string;
  correction: string;
  rule: string;
  impact: string;
}

export interface RuleDefinition {
  id: string;
  name: string;
  description: string;
  estimatedImpact: string;
  affectedRecords: number;
  reducedRisk: string;
  active: boolean;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  event: string;
  rule: string;
  affectedRecords: number;
  severity: LogSeverity;
  result: string;
  generatedFile?: string;
}

export interface QualityDimensionScore {
  dimension: "completude" | "unicidade" | "validade" | "consistencia" | "padronizacao" | "integridade";
  before: number;
  after: number;
  issues: number;
  severity: "baixo" | "medio" | "alto" | "critico";
  recommendation: string;
}

export interface RiskMetric {
  name: string;
  before: "baixo" | "medio" | "alto" | "critico";
  after: "baixo" | "medio" | "alto" | "critico";
  description: string;
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
  complexity: ComplexityLevel;
  description: string;
  problem: string;
  objective: string;
  status: AutomationStatus;
  impact: ImpactLevel;
  riskReduced: string;
  manualTimeHours: number;
  automatedTimeHours: number;
  estimatedSavingsHours: number;
  estimatedSavingsBRL: number;
  monthlySavingsBRL: number;
  annualSavingsBRL: number;
  successRate: number;
  averageResponseTimeMs: number;
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
  rulesEngine: RuleDefinition[];
  qualityDimensions: QualityDimensionScore[];
  riskProfile: RiskMetric[];
  auditTrail: AuditEvent[];
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
  id?: string;
  month: string;
  date?: string;
  automationSlug?: string;
  automationName?: string;
  category?: string;
  status?: ExecutionStatus;
  runs: number;
  records: number;
  fixedIssues?: number;
  beforeQualityScore?: number;
  afterQualityScore?: number;
  hoursSaved: number;
  savingsBRL: number;
  qualityScore: number;
  generatedFiles?: number;
  owner?: string;
  severity?: "baixo" | "medio" | "alto" | "critico";
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
  auditTrail: AuditEvent[];
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
  successRate: number;
  averageResponseTimeMs: number;
}

export interface SystemHealth {
  status: "healthy" | "degraded" | "down";
  lastExecutionAt: string;
  averageResponseTimeMs: number;
  successRate: number;
  activeAutomations: number;
  uptime: string;
  errorsByCategory: ErrorTypeMetric[];
  interactionEvents: number;
}

export interface DatasetProfile {
  id: string;
  name: string;
  description: string;
  owner: string;
  records: DatasetRecord[];
  requiredColumns: string[];
  expectedDateColumns: string[];
  numericColumns: string[];
  categoryColumns: string[];
}

export interface DataQualityIssue {
  id: string;
  datasetId: string;
  rowId: string;
  column: string;
  type: DataQualityIssueType;
  severity: DataQualitySeverity;
  message: string;
  recommendation: string;
  impact: string;
}

export interface DataQualityReport {
  id: string;
  datasetId: string;
  datasetName: string;
  generatedAt: string;
  score: number;
  scoreLabel: "Excelente" | "Bom" | "Atencao" | "Critico";
  totalRecords: number;
  totalIssues: number;
  issues: DataQualityIssue[];
  completenessByColumn: Array<{ column: string; completeness: number }>;
  issueTypeSeries: Array<{ type: DataQualityIssueType; count: number }>;
  executiveSummary: string;
  recommendations: string[];
}
