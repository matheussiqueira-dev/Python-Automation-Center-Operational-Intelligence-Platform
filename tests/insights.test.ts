import { describe, expect, it } from "vitest";
import { generateInsightsForAutomation, generatePortfolioInsights } from "@/lib/insights";
import { getAutomations } from "@/lib/mock-data";

describe("insight generation", () => {
  it("generates actionable insights for one automation", () => {
    const insights = generateInsightsForAutomation(getAutomations()[0]);

    expect(insights).toHaveLength(3);
    expect(insights[0].recommendation).toContain("validacao");
  });

  it("generates portfolio level insights", () => {
    const insights = generatePortfolioInsights(getAutomations());

    expect(insights.length).toBeGreaterThan(1);
    expect(insights.map((insight) => insight.category)).toContain("qualidade de dados");
  });
});
