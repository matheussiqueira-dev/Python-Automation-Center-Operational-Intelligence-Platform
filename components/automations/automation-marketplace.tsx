import { AutomationGrid } from "@/components/automations/automation-grid";
import type { Automation } from "@/lib/types";

export function AutomationMarketplace({ automations }: { automations: Automation[] }) {
  return <AutomationGrid automations={automations} />;
}
