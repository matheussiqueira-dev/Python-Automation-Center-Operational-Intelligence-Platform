import { Badge } from "@/components/shared/badge";

export function IssueSeverityBadge({ severity }: { severity: "baixo" | "medio" | "alto" | "critico" }) {
  const tone = severity === "critico" ? "rose" : severity === "alto" ? "amber" : severity === "medio" ? "blue" : "green";
  return <Badge tone={tone}>{severity}</Badge>;
}
