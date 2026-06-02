"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Lightbulb, ShieldCheck } from "lucide-react";
import { BeforeAfterTable } from "@/components/automations/before-after-table";
import { DataDiffViewer } from "@/components/data-quality/data-diff-viewer";
import { DataQualityScore } from "@/components/data-quality/data-quality-score";
import { RuleEnginePanel } from "@/components/data-quality/rule-engine-panel";
import { ValidationSummary } from "@/components/data-quality/validation-summary";
import { AuditTrail } from "@/components/execution/audit-trail";
import { ExecutionPipeline } from "@/components/execution/execution-pipeline";
import { QueueSimulator } from "@/components/execution/queue-simulator";
import { ExecutionPanel } from "@/components/automations/execution-panel";
import { ExecutionTimeline } from "@/components/automations/execution-timeline";
import { LogsPanel } from "@/components/automations/logs-panel";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import { ErrorState } from "@/components/shared/error-state";
import { MetricDelta } from "@/components/shared/metric-delta";
import { Tabs } from "@/components/shared/tabs";
import { formatCurrency, formatHours } from "@/lib/formatters";
import type { Automation, AutomationRunResult, DatasetRecord, ExecutionLog, ViewMode } from "@/lib/types";

interface AutomationDetailProps {
  automation: Automation;
  before: DatasetRecord[];
  after: DatasetRecord[];
}

export function AutomationDetail({ automation, before, after }: AutomationDetailProps) {
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [result, setResult] = useState<AutomationRunResult | null>(null);
  const [mode, setMode] = useState<ViewMode>("executive");
  const [enabledRules, setEnabledRules] = useState<string[]>(() => automation.rulesEngine.filter((rule) => rule.active).map((rule) => rule.id));
  const timerRef = useRef<number | null>(null);

  const qualityGain = automation.qualityAfter - automation.qualityBefore;

  const initialLogs = useMemo<ExecutionLog[]>(
    () => [
      {
        timestamp: "10:42:02",
        type: "info",
        severity: "info",
        step: "Preparando dados",
        message: "Ambiente de demonstracao carregado com dados simulados.",
      },
    ],
    [],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  async function handleRun() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    setStatus("running");
    setProgress(0);
    setActiveStep(0);
    setLogs(initialLogs);
    setResult(null);

    try {
      const response = await fetch("/api/automations/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ automationId: automation.id, enabledRules, mode }),
      });

      if (!response.ok) {
        throw new Error("Falha ao executar automacao");
      }

      const payload = (await response.json()) as AutomationRunResult;
      let tick = 0;
      const totalTicks = automation.timeline.length;
      timerRef.current = window.setInterval(() => {
        tick += 1;
        const nextProgress = Math.min(Math.round((tick / totalTicks) * 100), 100);
        setProgress(nextProgress);
        setActiveStep(Math.min(tick, automation.timeline.length - 1));
        setLogs([...initialLogs, ...payload.logs.slice(0, Math.min(tick, payload.logs.length))]);

        if (tick >= totalTicks) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setProgress(100);
          setActiveStep(automation.timeline.length - 1);
          setLogs([...initialLogs, ...payload.logs]);
          setResult(payload);
          setStatus("success");
        }
      }, 520);
    } catch {
      setStatus("error");
      setLogs((current) => [
        ...current,
        {
          timestamp: "10:42:07",
          type: "error",
          severity: "error",
          step: "Execucao",
          message: "Nao foi possivel concluir a simulacao. Tente novamente.",
        },
      ]);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {automation.kpis.map((kpi) => (
          <Card key={kpi.label} className="p-4">
            <p className="text-sm text-zinc-500">{kpi.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-2xl font-semibold text-white">{kpi.value}</p>
              <MetricDelta value={kpi.delta} tone="positive" />
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <Badge tone="blue">{automation.category}</Badge>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white">{automation.name}</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-300">{automation.problem}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Fact label="Tempo manual" value={formatHours(automation.manualTimeHours)} />
              <Fact label="Tempo automatizado" value={formatHours(automation.automatedTimeHours)} />
              <Fact label="Economia mensal" value={formatCurrency(automation.monthlySavingsBRL)} />
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/18 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-200" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-white">Score de qualidade</p>
                <p className="text-xs text-zinc-500">Antes e depois do tratamento</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 items-center gap-3 text-center">
              <Fact label="Antes" value={`${automation.qualityBefore}%`} />
              <Fact label="Ganho" value={`+${qualityGain} pts`} />
              <Fact label="Depois" value={`${automation.qualityAfter}%`} />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Tabs
          value={mode}
          onChange={setMode}
          items={[
            { value: "executive", label: "Modo executivo" },
            { value: "technical", label: "Modo tecnico" },
          ]}
        />
      </div>

      <ValidationSummary automation={automation} />
      <RuleEnginePanel rules={automation.rulesEngine} onChange={setEnabledRules} />
      <QueueSimulator automation={automation} activeStep={automation.timeline[activeStep] ?? "Na fila"} />
      <ExecutionPipeline steps={automation.timeline} activeIndex={activeStep} />
      <ExecutionPanel status={status} progress={progress} result={result} onRun={handleRun} />

      {status === "error" ? <ErrorState title="Erro na simulacao" description="A API retornou uma falha simulada ou indisponibilidade temporaria." /> : null}

      <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
        <ExecutionTimeline steps={automation.timeline} activeIndex={activeStep} completed={status === "success"} />
        <LogsPanel logs={logs} />
      </div>

      <BeforeAfterTable before={before} after={after} rules={automation.rules} />
      <DataDiffViewer before={before} after={after} rules={automation.rules} />
      <DataQualityScore automation={automation} />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-amber-200" aria-hidden="true" />
            <h2 className="text-xl font-semibold text-white">Insights automaticos</h2>
          </div>
          <div className="mt-4 grid gap-3">
            {(result?.insights ?? []).length ? (
              result?.insights.map((insight) => (
                <div key={insight.id} className="rounded-md border border-white/10 bg-black/18 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-white">{insight.title}</h3>
                    <Badge tone={insight.severity === "high" ? "rose" : "amber"}>{insight.category}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{insight.description}</p>
                  <p className="mt-2 text-sm text-emerald-100">{insight.recommendation}</p>
                </div>
              ))
            ) : (
              <p className="rounded-md border border-dashed border-white/10 p-4 text-sm text-zinc-500">Execute a automacao para liberar os insights calculados.</p>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-xl font-semibold text-white">Arquivos gerados</h2>
          <div className="mt-4 space-y-3">
            {automation.files.map((file) => (
              <a
                key={file.id}
                href={file.href}
                download
                className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/18 p-3 text-sm hover:bg-white/8"
              >
                <span>
                  <span className="block font-semibold text-white">{file.name}</span>
                  <span className="text-zinc-500">{file.type} - {file.size}</span>
                </span>
                <Download className="h-4 w-4 text-emerald-200" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Card>
      </div>

      {mode === "technical" ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_420px]">
          <AuditTrail events={result?.auditTrail ?? automation.auditTrail} />
          <Card className="p-5">
            <h2 className="text-lg font-semibold text-white">Payload tecnico</h2>
            <pre className="scrollbar-soft mt-4 max-h-96 overflow-auto rounded-md border border-white/10 bg-black/30 p-4 text-xs leading-6 text-zinc-300">
              {JSON.stringify(
                {
                  endpoint: "/api/automations/run",
                  method: "POST",
                  request: { automationId: automation.id, enabledRules, mode },
                  response: result ?? "execute a automacao para visualizar o payload",
                },
                null,
                2,
              )}
            </pre>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.035] p-3">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
