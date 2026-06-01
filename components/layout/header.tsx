import { PlayCircle, Workflow } from "lucide-react";
import { Button } from "@/components/shared/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/78 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white lg:hidden">Python Automation Center</p>
          <p className="hidden text-sm text-zinc-400 lg:block">Central interativa de automacoes Python, BI e qualidade de dados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button href="/automations" variant="secondary" icon={<Workflow className="h-4 w-4" aria-hidden="true" />}>
            <span className="hidden sm:inline">Ver automacoes</span>
            <span className="sm:hidden">Automacoes</span>
          </Button>
          <Button href="/automations/limpeza-planilhas-administrativas" icon={<PlayCircle className="h-4 w-4" aria-hidden="true" />}>
            <span className="hidden sm:inline">Executar demonstracao</span>
            <span className="sm:hidden">Demo</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
