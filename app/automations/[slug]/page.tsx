import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AutomationDetail } from "@/components/automations/automation-detail";
import { SectionHeader } from "@/components/shared/section-header";
import { getAutomationBySlug, getAutomations, getDatasetsForAutomation } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAutomations().map((automation) => ({ slug: automation.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const automation = getAutomationBySlug(slug);

  if (!automation) {
    return {
      title: "Automacao nao encontrada",
    };
  }

  return {
    title: automation.name,
    description: automation.description,
  };
}

export default async function AutomationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const automation = getAutomationBySlug(slug);

  if (!automation) {
    notFound();
  }

  const datasets = getDatasetsForAutomation(slug);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Detalhe da automacao"
          title="Simulacao com progresso, logs e rastreabilidade"
          description="Execute a rotina, acompanhe a timeline, compare antes/depois e baixe os arquivos simulados."
        />
        <AutomationDetail automation={automation} before={datasets.before} after={datasets.after} />
      </div>
    </div>
  );
}
