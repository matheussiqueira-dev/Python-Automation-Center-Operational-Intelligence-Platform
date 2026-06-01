import { describe, expect, it } from "vitest";
import { calculateOperationalSavings, calculateQualityScore, calculateRoi, calculateTimeSaved } from "@/lib/calculations";
import { getAutomations } from "@/lib/mock-data";

describe("operational calculations", () => {
  it("calculates saved time and savings consistently", () => {
    expect(calculateTimeSaved(10, 2.5)).toBe(7.5);
    expect(calculateOperationalSavings(10, 2.5, 100)).toBe(750);
  });

  it("calculates a quality score from detected issues", () => {
    expect(calculateQualityScore(100, 12)).toBe(88);
  });

  it("returns a positive ROI for the portfolio automations", () => {
    const roi = calculateRoi(getAutomations()[0]);
    expect(roi).toBeGreaterThan(0);
  });
});
