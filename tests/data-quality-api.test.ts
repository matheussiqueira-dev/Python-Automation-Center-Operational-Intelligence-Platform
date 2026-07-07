import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/data-quality/analyze/route";

describe("POST /api/data-quality/analyze", () => {
  it("returns a data quality report for a valid dataset", async () => {
    const response = await POST(
      new Request("http://localhost/api/data-quality/analyze", {
        method: "POST",
        body: JSON.stringify({ datasetId: "limpeza-planilhas-administrativas" }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.report.totalIssues).toBeGreaterThan(0);
  });

  it("rejects unknown datasets", async () => {
    const response = await POST(
      new Request("http://localhost/api/data-quality/analyze", {
        method: "POST",
        body: JSON.stringify({ datasetId: "dataset-inexistente" }),
      }),
    );

    expect(response.status).toBe(404);
  });
});
