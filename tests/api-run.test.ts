import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/automations/run/route";

describe("POST /api/automations/run", () => {
  it("returns a structured success result", async () => {
    const response = await POST(
      new Request("http://localhost/api/automations/run", {
        method: "POST",
        body: JSON.stringify({
          automationId: "auto-001",
          enabledRules: ["remover-duplicados", "normalizar-datas"],
          mode: "technical",
        }),
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.status).toBe("success");
    expect(payload.logs.length).toBeGreaterThan(0);
    expect(payload.auditTrail.length).toBeGreaterThan(0);
    expect(payload.files.length).toBeGreaterThan(0);
  });

  it("rejects unknown automations", async () => {
    const response = await POST(
      new Request("http://localhost/api/automations/run", {
        method: "POST",
        body: JSON.stringify({ slug: "automacao-inexistente" }),
      }),
    );

    expect(response.status).toBe(404);
  });
});
