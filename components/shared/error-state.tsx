import { AlertTriangle } from "lucide-react";

export function ErrorState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-rose-300/20 bg-rose-400/10 p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 text-rose-200" aria-hidden="true" />
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-rose-100/80">{description}</p>
        </div>
      </div>
    </div>
  );
}
