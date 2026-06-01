import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Carregando dados" }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] text-sm text-zinc-300">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
      {label}
    </div>
  );
}
