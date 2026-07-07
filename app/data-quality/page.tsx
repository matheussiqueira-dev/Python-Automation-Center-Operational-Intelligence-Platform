import type { Metadata } from "next";
import { DataQualityMonitor } from "@/components/data-quality/data-quality-monitor";
import { SectionHeader } from "@/components/shared/section-header";
import { getDataQualityReports, getDatasetProfiles } from "@/lib/data-quality";

export const metadata: Metadata = {
  title: "Data Quality Monitor",
  description: "Auditoria simulada de qualidade de dados com score, severidade, completude por coluna e recomendacoes.",
};

export default function DataQualityPage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Data Quality Monitor"
          title="Auditoria de dados antes do relatorio executivo"
          description="Selecione um dataset simulado, revise score, completude por coluna, severidade dos problemas e recomendacoes acionaveis."
        />
        <DataQualityMonitor datasets={getDatasetProfiles()} reports={getDataQualityReports()} />
      </div>
    </div>
  );
}
