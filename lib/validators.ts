import { z } from "zod";

export const runAutomationPayloadSchema = z.object({
  automationId: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/).optional(),
  slug: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/).optional(),
  enabledRules: z.array(z.string().min(2).max(80)).default([]),
  mode: z.enum(["executive", "technical"]).default("executive"),
}).refine((payload) => payload.automationId || payload.slug, {
  message: "automationId ou slug e obrigatorio.",
});

export const reportPayloadSchema = z.object({
  automationSlug: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/),
  format: z.enum(["json", "html"]).default("json"),
});

export const dataQualityPayloadSchema = z.object({
  datasetId: z.string().min(3).max(80).regex(/^[a-z0-9-]+$/),
});

export const executionQuerySchema = z.object({
  status: z.enum(["queued", "running", "completed", "failed"]).optional(),
  category: z.string().optional(),
  severity: z.enum(["baixo", "medio", "alto", "critico"]).optional(),
});

export function parseJsonError(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.issues.map((issue) => issue.message).join(", ");
  }

  return "Payload invalido.";
}
