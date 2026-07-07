import type { Metadata } from "next";
import { OperationalLogs } from "@/components/logs/operational-logs";
import { SectionHeader } from "@/components/shared/section-header";
import { getOperationalLogs } from "@/lib/executions";

export const metadata: Metadata = {
  title: "Operational Logs",
  description: "Centro de logs operacionais com filtros por automacao, severidade e busca textual.",
};

export default function LogsPage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Centro de logs operacionais"
          title="Rastreabilidade de execucoes simuladas"
          description="Filtre logs por automacao, nivel e texto para revisar tempo, contexto e volume processado por etapa."
        />
        <OperationalLogs logs={getOperationalLogs()} />
      </div>
    </div>
  );
}
