import type { Metadata } from "next";
import { ArrowUpRight, Code2, Database, Rocket, ShieldCheck, TerminalSquare } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Sobre o Projeto",
  description: "Arquitetura, stack, simulacao na Vercel, papel do Python, limitacoes e roteiro de demonstracao.",
};

const stack = ["Next.js App Router", "TypeScript", "Tailwind CSS", "Recharts", "Route Handlers", "Python local", "Vitest", "Vercel"];

const demoSteps = [
  "Acesse a central de automacoes.",
  "Escolha Limpeza de planilhas administrativas.",
  "Veja a base original com inconsistencias.",
  "Clique em Executar automacao.",
  "Acompanhe logs e progresso.",
  "Compare antes e depois.",
  "Abra o dashboard de impacto.",
  "Baixe o relatorio simulado.",
  "Consulte os insights automaticos.",
];

export default function AboutPage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Sobre o projeto"
          title="Uma vitrine tecnica de automacao, dados e produto"
          description="O Python Automation Center simula uma central corporativa de automacoes Python com dados mockados, APIs leves e experiencia interativa pronta para portfolio."
          action={
            <Button href="https://www.matheussiqueira.dev" external variant="secondary" icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}>
              Portfolio oficial
            </Button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Objetivo e problema resolvido</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              O projeto demonstra como rotinas administrativas, financeiras e analiticas podem sair de um fluxo manual, sujeito a inconsistencias, para um processo padronizado, rastreavel e mensuravel. Ele mostra entrada de base, validacao, simulacao de automacao, logs, KPIs, insights e relatorios.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <InfoBlock icon={<Database className="h-5 w-5" aria-hidden="true" />} title="Dados" text="Datasets ficticios e controlados, sem dados sensiveis." />
              <InfoBlock icon={<Code2 className="h-5 w-5" aria-hidden="true" />} title="Produto" text="Fluxo interativo com estados, filtros e downloads." />
              <InfoBlock icon={<Rocket className="h-5 w-5" aria-hidden="true" />} title="Deploy" text="Arquitetura compativel com Vercel Functions." />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-200" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-white">Creditos</h2>
            </div>
            <p className="mt-4 text-sm leading-6 text-zinc-300">Desenvolvido por Matheus Siqueira</p>
            <a
              href="https://www.matheussiqueira.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-sm font-semibold text-emerald-200 hover:text-emerald-100"
            >
              www.matheussiqueira.dev
            </a>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Tecnologias utilizadas</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <Badge key={item} tone="blue">
                  {item}
                </Badge>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-zinc-400">
              O App Router separa paginas, componentes e Route Handlers. Os dados ficam em JSON/TypeScript, os calculos em `lib`, os scripts Python geram datasets locais e os endpoints retornam simulacoes leves.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Por que usar simulacao na Vercel</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              A Vercel e excelente para interfaces, SSR/SSG e funcoes serverless leves. Processamentos Python longos nao devem rodar como dependencia principal de runtime. Por isso, Python gera datasets localmente e a producao consome arquivos estaticos e APIs rapidas.
            </p>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <TerminalSquare className="h-5 w-5 text-emerald-200" aria-hidden="true" />
              <h2 className="text-xl font-semibold text-white">Papel do Python</h2>
            </div>
            <p className="mt-3 text-sm leading-7 text-zinc-400">
              O script `scripts/generate_datasets.py` cria bases baguncadas, bases tratadas, historico de execucoes, insights e arquivos de exemplo em `data/` e `public/samples/`.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Como demonstrar este projeto</h2>
            <ol className="mt-4 grid gap-2 md:grid-cols-3">
              {demoSteps.map((step, index) => (
                <li key={step} className="rounded-md border border-white/10 bg-black/18 p-3 text-sm text-zinc-300">
                  <span className="mb-2 grid h-7 w-7 place-items-center rounded-md bg-emerald-300 text-xs font-bold text-zinc-950">{index + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Limitacoes conhecidas</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              <li>Os dados sao simulados e nao representam operacoes reais.</li>
              <li>Downloads usam arquivos estaticos ou payloads mockados.</li>
              <li>A execucao usa timers no client e nao processamento Python em producao.</li>
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white">Proximos passos</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
              <li>Adicionar persistencia em banco para historico real.</li>
              <li>Integrar upload controlado de CSV pequeno no client.</li>
              <li>Conectar filas ou workers externos para processamento pesado.</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/18 p-4">
      <div className="text-emerald-200">{icon}</div>
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-sm leading-6 text-zinc-400">{text}</p>
    </div>
  );
}
