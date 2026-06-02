import { describe, expect, it } from "vitest";
import { summarizeAudit } from "@/lib/audit";
import { calculateRuleImpact, getActiveRules } from "@/lib/rules";
import { getAutomations } from "@/lib/mock-data";

describe("rule engine and quality data", () => {
  it("summarizes active rules", () => {
    const automation = getAutomations()[0];
    const activeRules = getActiveRules(automation.rulesEngine);
    const impact = calculateRuleImpact(automation.rulesEngine);

    expect(activeRules.length).toBeGreaterThan(0);
    expect(impact.affectedRecords).toBeGreaterThan(0);
  });

  it("contains data quality dimensions", () => {
    const automation = getAutomations()[0];

    expect(automation.qualityDimensions.map((item) => item.dimension)).toContain("completude");
    expect(automation.qualityDimensions[0].after).toBeGreaterThan(automation.qualityDimensions[0].before);
  });

  it("summarizes audit trail records", () => {
    const summary = summarizeAudit(getAutomations()[0].auditTrail);

    expect(summary.totalEvents).toBeGreaterThan(0);
    expect(summary.affectedRecords).toBeGreaterThan(0);
  });
});
