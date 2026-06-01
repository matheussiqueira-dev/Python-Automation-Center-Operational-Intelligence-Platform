import { Button } from "@/components/shared/button";
import { EmptyState } from "@/components/shared/empty-state";

export default function NotFound() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <EmptyState title="Pagina nao encontrada" description="A rota solicitada nao faz parte da central de automacoes." />
        <Button href="/automations">Ver automacoes</Button>
      </div>
    </div>
  );
}
