import { Card } from "@/components/shared/card";

export function ExecutiveReport({
  title,
  summary,
  preview,
}: {
  title: string;
  summary: string;
  preview: string[];
}) {
  return (
    <Card className="p-5">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{summary}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-300">
        {preview.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
