import type { Metadata } from "next";
import { AlertTriangle, CheckCircle2, Clock3, Database, DollarSign, Gauge, RotateCcw, Workflow } from "lucide-react";
import { AutomationUsageChart } from "@/components/dashboard/automation-usage-chart";
import { DataQualityChart } from "@/components/dashboard/data-quality-chart";
import { InsightsPanel } from "@/components/dashboard/insights-panel";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { OperationalImpactChart } from "@/components/dashboard/operational-impact-chart";
import { RoiSummary } from "@/components/dashboard/roi-summary";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import { SectionHeader } from "@/components/shared/section-header";
import { rankAutomationsByEfficiency } from "@/lib/calculations";
import { formatCompactNumber, formatCurrency, formatHours, formatPercent } from "@/lib/formatters";
import { getAutomations, getDashboardInsights, getDashboardMetrics, getExecutionHistory } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard executivo de automacoes Python, qualidade de dados, eficiencia operacional e alertas inteligentes.",
};

export default function DashboardPage() {
  const automations = getAutomations();
  const metrics = getDashboardMetrics();
  const history = getExecutionHistory();
  const insights = getDashboardInsights();
  const ranking = rankAutomationsByEfficiency(automations);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Dashboard executivo"
          title="Impacto operacional consolidado"
          description="KPIs, tendencias, ranking de eficiencia, qualidade de dados e alertas inteligentes para demonstracao de BI operacional."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Automacoes executadas" value={metrics.totalExecutions.toString()} helper="Execucoes simuladas" delta="+24%" icon={<Workflow className="h-5 w-5" aria-hidden="true" />} />
          <KpiCard label="Registros processados" value={formatCompactNumber(metrics.processedRecords)} helper="Bases administrativas" delta="+38%" icon={<Database className="h-5 w-5" aria-hidden="true" />} />
          <KpiCard label="Inconsistencias corrigidas" value={formatCompactNumber(metrics.fixedIssues)} helper="Erros tratados" delta="+31%" icon={<CheckCircle2 className="h-5 w-5" aria-hidden="true" />} />
          <KpiCard label="Economia simulada" value={formatCurrency(metrics.operationalSavingsBRL)} helper="Valor operacional" delta="+19%" icon={<DollarSign className="h-5 w-5" aria-hidden="true" />} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Tendencia de horas economizadas</h2>
              <Clock3 className="h-5 w-5 text-emerald-200" aria-hidden="true" />
            </div>
            <OperationalImpactChart data={history} />
          </Card>
          <RoiSummary automations={automations} />
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white">Uso por automacao</h2>
            <p className="mt-1 text-sm text-zinc-500">Horas economizadas por rotina simulada.</p>
            <AutomationUsageChart automations={automations} />
          </Card>
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white">Qualidade de dados antes/depois</h2>
            <p className="mt-1 text-sm text-zinc-500">Comparacao de score por automacao.</p>
            <DataQualityChart automations={automations} />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Ranking de eficiencia</h2>
              <Badge tone="green">{formatPercent(metrics.averageQualityScore)} qualidade media</Badge>
            </div>
            <div className="mt-4 space-y-3">
              {ranking.map((automation, index) => (
                <div key={automation.id} className="grid grid-cols-[32px_1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-black/18 p-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-white/8 text-sm font-semibold text-zinc-300">{index + 1}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{automation.name}</p>
                    <p className="text-xs text-zinc-500">{automation.fixedIssues} inconsistencias corrigidas</p>
                  </div>
                  <span className="text-sm font-semibold text-emerald-200">{formatHours(automation.estimatedSavingsHours)}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-200" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-white">Alertas inteligentes</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <AlertItem title="Duplicidades recorrentes" description={`${metrics.duplicatesRemoved} duplicidades removidas nos fluxos simulados.`} />
                <AlertItem title="Qualidade inicial baixa" description={`Score medio antes do tratamento: ${metrics.averageQualityBefore}%.`} />
                <AlertItem title="Campos padronizados" description={`${metrics.standardizedFields} campos passaram por normalizacao.`} />
                <AlertItem title="Retrabalho reduzido" description={`${metrics.reworkReduction}% de reducao media de retrabalho.`} />
              </div>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-sky-200" aria-hidden="true" />
                <h2 className="text-lg font-semibold text-white">Tipos de erro</h2>
              </div>
              <div className="mt-4 space-y-3">
                {automations[0].errorTypes.map((error) => (
                  <div key={error.name}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-zinc-300">{error.name}</span>
                      <span className="text-zinc-500">{error.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-sky-300" style={{ width: `${Math.min(error.value / 1.4, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <InsightsPanel insights={insights} />
          <Card className="p-5">
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-emerald-200" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-white">Ritmo operacional</h2>
            </div>
            <div className="mt-4 space-y-3">
              {history.slice(-3).map((entry) => (
                <div key={entry.month} className="rounded-md border border-white/10 bg-black/18 p-4">
                  <p className="text-sm font-semibold text-white">{entry.month}</p>
                  <p className="mt-1 text-sm text-zinc-400">{entry.runs} execucoes, {entry.records.toLocaleString("pt-BR")} registros e {entry.qualityScore}% de qualidade.</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}
