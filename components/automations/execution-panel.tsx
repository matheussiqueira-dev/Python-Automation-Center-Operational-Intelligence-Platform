import { Download, Loader2, PlayCircle } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import type { AutomationRunResult } from "@/lib/types";

interface ExecutionPanelProps {
  status: "idle" | "running" | "success" | "error";
  progress: number;
  result: AutomationRunResult | null;
  onRun: () => void;
}

export function ExecutionPanel({ status, progress, result, onRun }: ExecutionPanelProps) {
  const running = status === "running";

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">Simulacao</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Executar automacao</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">A execucao usa timers no client e um Route Handler leve para retornar resultado estruturado.</p>
        </div>
        <Button onClick={onRun} disabled={running} icon={running ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <PlayCircle className="h-4 w-4" aria-hidden="true" />}>
          {running ? "Executando" : "Executar automacao"}
        </Button>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
          <span>Status: {status === "idle" ? "Aguardando inicio" : status === "running" ? "Processando" : status === "success" ? "Concluido" : "Erro"}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-white/10">
          <div className="h-3 rounded-full bg-emerald-300 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {result ? (
        <div className="mt-5 grid gap-3 text-sm md:grid-cols-4">
          <div className="rounded-md bg-black/18 p-3">
            <p className="text-zinc-500">Duracao</p>
            <p className="mt-1 font-semibold text-white">{(result.durationMs / 1000).toFixed(1)}s</p>
          </div>
          <div className="rounded-md bg-black/18 p-3">
            <p className="text-zinc-500">Registros</p>
            <p className="mt-1 font-semibold text-white">{result.processedRecords.toLocaleString("pt-BR")}</p>
          </div>
          <div className="rounded-md bg-black/18 p-3">
            <p className="text-zinc-500">Correcoes</p>
            <p className="mt-1 font-semibold text-white">{result.fixedIssues.toLocaleString("pt-BR")}</p>
          </div>
          <a
            href={result.files[0]?.href ?? "/samples/executive-report-sample.json"}
            download
            className="inline-flex min-h-16 items-center justify-center gap-2 rounded-md border border-emerald-300/25 bg-emerald-300/10 px-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-300/15"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Baixar arquivo
          </a>
        </div>
      ) : null}
    </Card>
  );
}
