import type { Metadata } from "next";
import { ArrowRight, Database, FileJson, FunctionSquare, Network, TerminalSquare } from "lucide-react";
import { Card } from "@/components/shared/card";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Arquitetura do Python Automation Center, fluxo de dados, Vercel Functions e Python local.",
};

const nodes = [
  { title: "Python local", text: "Gera datasets, CSVs, relatorios e arquivos de amostra antes do deploy.", icon: TerminalSquare },
  { title: "Data layer", text: "JSONs mockados versionados em data/ e arquivos publicos em public/samples/.", icon: Database },
  { title: "Next.js App Router", text: "Paginas de produto, dashboard, execucoes, arquitetura e case study.", icon: Network },
  { title: "Route Handlers", text: "Simulacoes leves para run, reports, downloads, executions e health.", icon: FunctionSquare },
  { title: "Downloads", text: "CSV, JSON, HTML, checklist e logs simulados para demonstracao.", icon: FileJson },
];

export default function ArchitecturePage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Architecture"
          title="Arquitetura Vercel-ready para automacoes simuladas"
          description="A aplicacao separa preparacao local de dados, interface, regras de negocio e APIs leves para evitar processamento pesado em runtime."
        />
        <Card className="p-6">
          <div className="grid gap-4 lg:grid-cols-5">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              return (
                <div key={node.title} className="relative rounded-md border border-white/10 bg-black/18 p-4">
                  <Icon className="h-5 w-5 text-emerald-200" aria-hidden="true" />
                  <h2 className="mt-4 text-base font-semibold text-white">{node.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{node.text}</p>
                  {index < nodes.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-zinc-600 lg:block" /> : null}
                </div>
              );
            })}
          </div>
        </Card>
        <div className="grid gap-4 lg:grid-cols-3">
          <Info title="Papel do Next.js" text="Renderiza a experiencia de produto, rotas estaticas, componentes interativos e metadados SEO." />
          <Info title="Papel das Vercel Functions" text="Route Handlers retornam payloads estruturados pequenos, com validacao Zod e sem processamento longo." />
          <Info title="Evolucao real" text="Para producao real, o processamento pesado iria para filas, workers externos, storage e banco operacional." />
        </div>
      </div>
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <Card className="p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{text}</p>
    </Card>
  );
}
