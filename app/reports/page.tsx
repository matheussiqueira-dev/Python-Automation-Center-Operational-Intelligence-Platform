import type { Metadata } from "next";
import { DownloadCard } from "@/components/reports/download-card";
import { ReportPreview } from "@/components/reports/report-preview";
import { SectionHeader } from "@/components/shared/section-header";
import { getDownloadFiles } from "@/lib/mock-data";
import { getReports } from "@/lib/reports";

export const metadata: Metadata = {
  title: "Relatorios",
  description: "Relatorios executivos simulados, previews e downloads de arquivos gerados pelas automacoes.",
};

export default function ReportsPage() {
  const reports = getReports();
  const files = getDownloadFiles();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Relatorios"
          title="Arquivos simulados prontos para download"
          description="Cada relatorio resume automacao, status, formato, data de geracao, preview executivo e arquivos disponiveis."
        />

        <div className="grid gap-4 xl:grid-cols-2">
          {reports.map((report) => (
            <ReportPreview key={report.id} report={report} />
          ))}
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Downloads simulados</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {files.slice(0, 8).map((file) => (
              <DownloadCard key={file.id} file={file} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
