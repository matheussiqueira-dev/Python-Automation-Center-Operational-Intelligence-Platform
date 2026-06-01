import { describe, expect, it } from "vitest";
import { reportPayloadSchema, runAutomationPayloadSchema } from "@/lib/validators";

describe("api validators", () => {
  it("accepts a valid automation run payload", () => {
    expect(runAutomationPayloadSchema.safeParse({ slug: "limpeza-planilhas-administrativas" }).success).toBe(true);
  });

  it("rejects unsafe slug values", () => {
    expect(runAutomationPayloadSchema.safeParse({ slug: "../secrets" }).success).toBe(false);
  });

  it("defaults report format to json", () => {
    const parsed = reportPayloadSchema.parse({ automationSlug: "geracao-relatorio-executivo" });
    expect(parsed.format).toBe("json");
  });
});
