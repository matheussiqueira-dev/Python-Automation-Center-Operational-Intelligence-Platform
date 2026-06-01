import { ArrowRight, Database, FileCheck2, Gauge, ListChecks, PlayCircle, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card } from "@/components/shared/card";
import { SectionHeader } from "@/components/shared/section-header";
import { formatCurrency, formatHours } from "@/lib/formatters";
import { getAutomations, getDashboardMetrics } from "@/lib/mock-data";

const gains = [
  { title: "Reducao de retrabalho", icon: ListChecks, description: "Validacoes automatizadas reduzem conferencia repetitiva e erros de digitacao." },
  { title: "Padronizacao de dados", icon: Database, description: "Campos criticos seguem regras consistentes antes da consolidacao." },
  { title: "Relatorios rastreaveis", icon: FileCheck2, description: "Cada execucao libera arquivos simulados, logs e resumo executivo." },
  { title: "Insights operacionais", icon: Sparkles, description: "Regras analiticas indicam riscos, ganhos e proximas acoes." },
];

const workflowSteps = ["Entrada da base", "Validacao", "Automacao", "Relatorio final"];

export default function Home() {
  const automations = getAutomations();
  const metrics = getDashboardMetrics();

  return (
    <div className="dashboard-grid-bg">
      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <Badge tone="green">Operational Intelligence Platform</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Python Automation Center
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              Central interativa para simular automacoes corporativas com Python, tratamento de dados, geracao de relatorios, logs operacionais e mensuracao de ganhos de eficiencia.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-7 text-emerald-100">
              Transforme bases desorganizadas em relatorios padronizados, auditaveis e prontos para tomada de decisao.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/automations/limpeza-planilhas-administrativas" icon={<PlayCircle className="h-4 w-4" aria-hidden="true" />}>
                Executar demonstracao
              </Button>
              <Button href="/automations" variant="secondary" icon={<Workflow className="h-4 w-4" aria-hidden="true" />}>
                Ver automacoes
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-950/78 p-4 shadow-2xl">
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricPreview label="Automacoes" value={metrics.totalExecutions.toString()} />
              <MetricPreview label="Registros" value={metrics.processedRecords.toLocaleString("pt-BR")} />
              <MetricPreview label="Horas salvas" value={formatHours(metrics.hoursSaved)} />
              <MetricPreview label="Economia" value={formatCurrency(metrics.operationalSavingsBRL)} />
            </div>
            <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Preview do dashboard</p>
                <Gauge className="h-4 w-4 text-emerald-200" aria-hidden="true" />
              </div>
              <div className="space-y-3">
                {automations.slice(0, 4).map((automation) => (
                  <div key={automation.id} className="grid grid-cols-[1fr_92px] items-center gap-3">
                    <span className="truncate text-sm text-zinc-300">{automation.name}</span>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-emerald-300" style={{ width: `${automation.qualityAfter}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Ganhos principais"
            title="Um produto demonstravel, nao uma tela estatica"
            description="A plataforma mostra problema, execucao, rastreabilidade e impacto operacional em uma jornada completa."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {gains.map((gain) => {
              const Icon = gain.icon;

              return (
                <Card key={gain.title} className="p-5">
                  <Icon className="h-5 w-5 text-emerald-200" aria-hidden="true" />
                  <h2 className="mt-4 text-lg font-semibold text-white">{gain.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{gain.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Como funciona" title="Da planilha baguncada ao relatorio executivo" />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <div key={step} className="relative rounded-lg border border-white/10 bg-white/[0.045] p-5">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-emerald-300 text-sm font-bold text-zinc-950">{index + 1}</span>
                <h2 className="mt-4 text-lg font-semibold text-white">{step}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {index === 0 && "Dados simulados entram com duplicidades, nulos e formatos inconsistentes."}
                  {index === 1 && "Regras de validacao classificam severidade e campos problemáticos."}
                  {index === 2 && "A rotina aplica padronizacao, consolidacao e logs de auditoria."}
                  {index === 3 && "KPIs, insights e arquivos simulados ficam prontos para demonstracao."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg border border-white/10 bg-white/[0.045] p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-200">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <p className="text-sm font-semibold">Desenvolvido por Matheus Siqueira</p>
            </div>
            <p className="mt-2 text-sm text-zinc-400">Produto de portfolio com Next.js, TypeScript, Tailwind, Route Handlers, Python local e dados simulados.</p>
          </div>
          <Button href="https://www.matheussiqueira.dev" external variant="secondary" icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}>
            www.matheussiqueira.dev
          </Button>
        </div>
      </section>
    </div>
  );
}

function MetricPreview({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
