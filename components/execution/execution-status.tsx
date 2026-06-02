import { Badge } from "@/components/shared/badge";
import type { ExecutionStatus as ExecutionStatusType } from "@/lib/types";

const toneByStatus: Record<ExecutionStatusType, "green" | "blue" | "amber" | "rose"> = {
  queued: "amber",
  running: "blue",
  completed: "green",
  failed: "rose",
};

export function ExecutionStatus({ status }: { status: ExecutionStatusType }) {
  return <Badge tone={toneByStatus[status]}>{status}</Badge>;
}
