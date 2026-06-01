"use client";

import { ErrorState } from "@/components/shared/error-state";
import { Button } from "@/components/shared/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-4">
        <ErrorState title="Algo saiu do fluxo esperado" description="A interface encontrou uma falha. Recarregue a rota para tentar novamente." />
        <Button onClick={reset}>Tentar novamente</Button>
      </div>
    </div>
  );
}
