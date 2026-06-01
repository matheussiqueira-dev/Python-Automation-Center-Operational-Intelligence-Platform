import { CalendarDays, FileText } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { formatDate } from "@/lib/formatters";

interface ReportPreviewProps {
  report: {
    id: string;
    title: string;
    generatedAt: string;
    automationName: string;
    status: string;
    format: string;
    executiveSummary: string;
    preview: string[];
    href: string;
  };
}

export function ReportPreview({ report }: ReportPreviewProps) {
  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="green">{report.status}</Badge>
            <Badge tone="blue">{report.format}</Badge>
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">{report.title}</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{report.executiveSummary}</p>
        </div>
        <Button href={report.href} variant="secondary" icon={<FileText className="h-4 w-4" aria-hidden="true" />}>
          Download
        </Button>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-md border border-white/10 bg-black/18 p-3">
          <p className="flex items-center gap-2 text-xs text-zinc-500">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Gerado em
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{formatDate(report.generatedAt)}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-black/18 p-3 md:col-span-2">
          <p className="text-xs text-zinc-500">Automacao vinculada</p>
          <p className="mt-2 text-sm font-semibold text-white">{report.automationName}</p>
        </div>
      </div>
      <div className="mt-4 rounded-md border border-white/10 bg-zinc-950/62 p-4">
        <p className="text-sm font-semibold text-white">Preview do conteudo</p>
        <ul className="mt-3 space-y-2 text-sm text-zinc-400">
          {report.preview.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
