import { z } from "zod";

export const runAutomationPayloadSchema = z.object({
  slug: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/),
});

export const reportPayloadSchema = z.object({
  automationSlug: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/),
  format: z.enum(["json", "html"]).default("json"),
});

export function parseJsonError(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message).join(", ");
  }

  return "Payload invalido.";
}
