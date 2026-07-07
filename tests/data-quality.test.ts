import { describe, expect, it } from "vitest";
import { analyzeDatasetById, getDataQualityReports, getDatasetProfiles } from "@/lib/data-quality";

describe("data quality monitor", () => {
  it("builds dataset profiles from mocked datasets", () => {
    const profiles = getDatasetProfiles();

    expect(profiles.length).toBeGreaterThan(0);
    expect(profiles[0].records.length).toBeGreaterThan(0);
  });

  it("returns a scored report with issues and completeness", () => {
    const report = analyzeDatasetById("limpeza-planilhas-administrativas");

    expect(report).not.toBeNull();
    expect(report?.score).toBeGreaterThan(0);
    expect(report?.totalIssues).toBeGreaterThan(0);
    expect(report?.completenessByColumn.length).toBeGreaterThan(0);
  });

  it("builds reports for the monitor screen", () => {
    expect(getDataQualityReports().length).toBeGreaterThan(0);
  });
});
