import type { Metadata } from "next";
import { AutomationGrid } from "@/components/automations/automation-grid";
import { SectionHeader } from "@/components/shared/section-header";
import { getAutomations } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Automacoes",
  description: "Cards de automacoes Python simuladas com impacto, tempo manual, tempo automatizado e detalhes de execucao.",
};

export default function AutomationsPage() {
  const automations = getAutomations();

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <SectionHeader
          eyebrow="Central de automacoes"
          title="Escolha uma rotina para executar"
          description="Cada card apresenta problema, categoria, tempo manual, tempo automatizado, economia simulada, status e nivel de impacto."
        />
        <AutomationGrid automations={automations} />
      </div>
    </div>
  );
}
