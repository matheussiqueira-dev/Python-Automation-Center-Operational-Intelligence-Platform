import type { RuleDefinition } from "@/lib/types";

export function getActiveRules(rules: RuleDefinition[]) {
  return rules.filter((rule) => rule.active);
}

export function calculateRuleImpact(rules: RuleDefinition[]) {
  return rules.reduce(
    (acc, rule) => {
      if (rule.active) {
        acc.affectedRecords += rule.affectedRecords;
        acc.activeRules += 1;
      }
      return acc;
    },
    { activeRules: 0, affectedRecords: 0 },
  );
}
