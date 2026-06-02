import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns system health metadata", async () => {
    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.status).toBe("healthy");
    expect(payload.activeAutomations).toBeGreaterThanOrEqual(8);
  });
});
