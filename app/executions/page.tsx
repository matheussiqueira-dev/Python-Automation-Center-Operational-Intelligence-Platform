import type { Metadata } from "next";
import { ExecutionStatus } from "@/components/execution/execution-status";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import { SectionHeader } from "@/components/shared/section-header";
import { formatCurrency, formatDate, formatHours } from "@/lib/formatters";
import { getExecutions } from "@/lib/executions";

export const metadata: Metadata = {
  title: "Execution History",
  description: "Historico de execucoes simuladas, status, scores, arquivos e responsaveis ficticios.",
};

export default function ExecutionsPage() {
  const executions = getExecutions();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Execution History"
          title="Historico operacional rastreavel"
          description="Execucoes simuladas com automacao, data, status, registros processados, score antes/depois, arquivos gerados e responsavel ficticio."
        />
        <Card className="p-4">
          <div className="scrollbar-soft overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                <tr>
                  <th className="px-3 py-3">Automacao</th>
                  <th className="px-3 py-3">Data</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Registros</th>
                  <th className="px-3 py-3">Correcoes</th>
                  <th className="px-3 py-3">Score</th>
                  <th className="px-3 py-3">Economia</th>
                  <th className="px-3 py-3">Arquivos</th>
                  <th className="px-3 py-3">Responsavel</th>
                </tr>
              </thead>
              <tbody>
                {executions.map((execution) => (
                  <tr key={execution.id} className="border-t border-white/8">
                    <td className="px-3 py-4">
                      <p className="font-semibold text-white">{execution.automationName}</p>
                      <p className="mt-1 text-xs text-zinc-500">{execution.category}</p>
                    </td>
                    <td className="px-3 py-4 text-zinc-300">{execution.date ? formatDate(execution.date) : "-"}</td>
                    <td className="px-3 py-4">{execution.status ? <ExecutionStatus status={execution.status} /> : null}</td>
                    <td className="px-3 py-4 text-zinc-300">{execution.records.toLocaleString("pt-BR")}</td>
                    <td className="px-3 py-4 text-zinc-300">{execution.fixedIssues?.toLocaleString("pt-BR")}</td>
                    <td className="px-3 py-4 text-zinc-300">{execution.beforeQualityScore}% {"->"} {execution.afterQualityScore}%</td>
                    <td className="px-3 py-4 text-zinc-300">{formatHours(execution.hoursSaved)} / {formatCurrency(execution.savingsBRL)}</td>
                    <td className="px-3 py-4"><Badge tone="blue">{execution.generatedFiles} arquivos</Badge></td>
                    <td className="px-3 py-4 text-zinc-300">{execution.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
