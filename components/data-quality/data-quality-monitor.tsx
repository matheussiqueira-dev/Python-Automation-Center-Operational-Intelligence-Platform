"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import type { DataQualityReport, DataQualitySeverity, DatasetProfile } from "@/lib/types";

const severityTone: Record<DataQualitySeverity, "green" | "blue" | "amber" | "rose"> = {
  baixo: "blue",
  medio: "amber",
  alto: "rose",
  critico: "rose",
};

interface DataQualityMonitorProps {
  datasets: DatasetProfile[];
  reports: DataQualityReport[];
}

export function DataQualityMonitor({ datasets, reports }: DataQualityMonitorProps) {
  const [datasetId, setDatasetId] = useState(datasets[0]?.id ?? "");
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);
  const report = useMemo(() => reports.find((item) => item.datasetId === datasetId) ?? reports[0], [datasetId, reports]);

  if (!report) {
    return <Card className="p-5 text-sm text-zinc-400">Nenhum dataset disponivel para auditoria.</Card>;
  }

  const dataset = datasets.find((item) => item.id === report.datasetId);

  return (
    <div className="space-y-6">
      <Card className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-white">Dataset simulado</span>
          <select
            value={datasetId}
            onChange={(event) => setDatasetId(event.target.value)}
            className="h-11 w-full rounded-md border border-white/12 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-emerald-300/60"
          >
            {datasets.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <p className="text-sm leading-6 text-zinc-400">{dataset?.description}</p>
        </label>
        <div className="space-y-2">
          <Button
            icon={<ShieldCheck className="h-4 w-4" aria-hidden="true" />}
            onClick={() => setLastRunAt(new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date()))}
          >
            Rodar auditoria
          </Button>
          {lastRunAt ? <p className="text-xs text-zinc-500">Ultima execucao: {lastRunAt}</p> : null}
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Score geral</p>
              <p className="mt-1 text-sm text-zinc-400">Classificacao por severidade dos problemas detectados.</p>
            </div>
            <Badge tone={report.score >= 90 ? "green" : report.score >= 75 ? "blue" : report.score >= 60 ? "amber" : "rose"}>
              {report.scoreLabel}
            </Badge>
          </div>
          <p className="mt-5 text-5xl font-semibold text-white">{report.score}</p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{report.executiveSummary}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Metric label="Registros" value={report.totalRecords.toString()} />
            <Metric label="Problemas" value={report.totalIssues.toString()} tone="text-amber-200" />
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold text-white">Completude por coluna</p>
          <div className="mt-4 space-y-3">
            {report.completenessByColumn.map((item) => (
              <div key={item.column}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">{item.column}</span>
                  <span className="text-zinc-500">{item.completeness}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${item.completeness}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card className="p-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-white">Problemas detectados</p>
            <p className="mt-1 text-sm text-zinc-400">Linha, coluna, tipo, severidade e impacto no relatorio final.</p>
          </div>
          <div className="scrollbar-soft overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-zinc-500">
                <tr>
                  <th className="px-3 py-3">Linha</th>
                  <th className="px-3 py-3">Coluna</th>
                  <th className="px-3 py-3">Tipo</th>
                  <th className="px-3 py-3">Severidade</th>
                  <th className="px-3 py-3">Impacto</th>
                </tr>
              </thead>
              <tbody>
                {report.issues.map((issue) => (
                  <tr key={issue.id} className="border-t border-white/8">
                    <td className="px-3 py-4 text-zinc-300">{issue.rowId}</td>
                    <td className="px-3 py-4 text-zinc-300">{issue.column}</td>
                    <td className="px-3 py-4 text-zinc-400">{issue.type}</td>
                    <td className="px-3 py-4"><Badge tone={severityTone[issue.severity]}>{issue.severity}</Badge></td>
                    <td className="px-3 py-4 text-zinc-400">{issue.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-semibold text-white">Recomendacoes acionaveis</p>
          <div className="mt-4 space-y-3">
            {report.recommendations.map((recommendation, index) => (
              <div key={recommendation} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
                {index === 0 ? <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-200" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-200" />}
                <p className="text-sm leading-6 text-zinc-300">{recommendation}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Metric({ label, value, tone = "text-white" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${tone}`}>{value}</p>
    </div>
  );
}
