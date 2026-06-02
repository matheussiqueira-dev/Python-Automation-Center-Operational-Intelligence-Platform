import type { Metadata } from "next";
import { Card } from "@/components/shared/card";
import { SectionHeader } from "@/components/shared/section-header";

export const metadata: Metadata = {
  title: "Case Study",
  description: "Case study para recrutadores sobre problema, solucao, resultado e stack do Python Automation Center.",
};

const sections = [
  {
    title: "Problema",
    text: "Rotinas administrativas dependem de planilhas manuais, com erros, duplicidades, formatos divergentes e retrabalho antes de qualquer analise gerencial.",
  },
  {
    title: "Solucao",
    text: "Central de automacoes que simula limpeza, validacao, consolidacao, auditoria, monitoramento de SLA e geracao de relatorios com logs e score de qualidade.",
  },
  {
    title: "Resultado",
    text: "Reducao simulada de tempo, aumento do score de qualidade, rastreabilidade, relatorios prontos para decisao e comunicacao clara de ROI operacional.",
  },
  {
    title: "Stack",
    text: "Next.js, TypeScript, Tailwind CSS, Recharts, Route Handlers, Vercel Functions, Python local, Vitest e GitHub.",
  },
];

export default function CaseStudyPage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Case Study"
          title="Produto de portfolio para recrutadores e decisores"
          description="Resumo narrativo do problema, solucao, resultado e stack por tras da Operational Intelligence Platform."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Card key={section.title} className="p-6">
              <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-400">{section.text}</p>
            </Card>
          ))}
        </div>
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white">Como demonstrar este projeto</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Abrir a Home",
              "Acessar Automation Marketplace",
              "Escolher Limpeza de planilhas administrativas",
              "Ver a base antes",
              "Ativar/desativar regras",
              "Executar automacao",
              "Acompanhar pipeline e logs",
              "Ver Data Diff",
              "Consultar Data Quality Score",
              "Abrir modo tecnico",
              "Baixar relatorio",
              "Ver dashboard executivo",
              "Abrir Architecture",
              "Finalizar mostrando creditos",
            ].map((step, index) => (
              <li key={step} className="rounded-md border border-white/10 bg-black/18 p-3 text-sm text-zinc-300">
                <span className="mb-2 grid h-7 w-7 place-items-center rounded-md bg-emerald-300 text-xs font-bold text-zinc-950">{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
}
