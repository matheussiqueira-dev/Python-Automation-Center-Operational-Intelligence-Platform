import { Badge } from "@/components/shared/badge";
import { statusLabel } from "@/lib/formatters";
import type { AutomationStatus } from "@/lib/types";

const toneByStatus: Record<AutomationStatus, "green" | "blue" | "amber" | "rose" | "zinc"> = {
  ready: "blue",
  running: "amber",
  success: "green",
  attention: "rose",
};

export function AutomationStatusBadge({ status }: { status: AutomationStatus }) {
  return <Badge tone={toneByStatus[status]}>{statusLabel(status)}</Badge>;
}
