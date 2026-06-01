import { Download } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Card } from "@/components/shared/card";
import { formatDate } from "@/lib/formatters";
import type { GeneratedFile } from "@/lib/types";

export function DownloadCard({ file }: { file: GeneratedFile }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Badge tone="zinc">{file.type}</Badge>
          <h3 className="mt-3 truncate text-sm font-semibold text-white">{file.name}</h3>
          <p className="mt-1 text-xs text-zinc-500">{file.size} - {formatDate(file.generatedAt)}</p>
        </div>
        <a
          href={file.href}
          download
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-emerald-300/25 bg-emerald-300/10 text-emerald-100 hover:bg-emerald-300/15"
          aria-label={`Baixar ${file.name}`}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </Card>
  );
}
