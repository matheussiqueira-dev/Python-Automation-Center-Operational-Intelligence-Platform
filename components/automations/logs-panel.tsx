import { AlertCircle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/formatters";
import type { ExecutionLog } from "@/lib/types";

const iconByType = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

const colorByType = {
  info: "text-sky-200",
  success: "text-emerald-200",
  warning: "text-amber-200",
  error: "text-rose-200",
};

export function LogsPanel({ logs }: { logs: ExecutionLog[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-zinc-950/74 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-white">Logs operacionais</h3>
        <span className="rounded-full bg-white/8 px-2 py-1 text-xs text-zinc-400">{logs.length} eventos</span>
      </div>
      <div className="scrollbar-soft mt-4 max-h-72 space-y-2 overflow-auto font-mono text-xs">
        {logs.length ? (
          logs.map((log, index) => {
            const Icon = iconByType[log.type];

            return (
              <div key={`${log.timestamp}-${index}`} className="grid gap-2 rounded-md border border-white/8 bg-white/[0.035] p-3 md:grid-cols-[84px_88px_1fr]">
                <span className="text-zinc-500">[{log.timestamp}]</span>
                <span className={cn("inline-flex items-center gap-1 uppercase", colorByType[log.type])}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {log.type}
                </span>
                <span className="text-zinc-300">{log.message}</span>
              </div>
            );
          })
        ) : (
          <p className="rounded-md border border-dashed border-white/10 p-4 text-zinc-500">Logs serao exibidos durante a simulacao.</p>
        )}
      </div>
    </div>
  );
}
