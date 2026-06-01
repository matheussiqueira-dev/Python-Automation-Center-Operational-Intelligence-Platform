import { SearchX } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/[0.035] p-8 text-center">
      <SearchX className="mx-auto mb-3 h-8 w-8 text-zinc-500" aria-hidden="true" />
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">{description}</p>
    </div>
  );
}
