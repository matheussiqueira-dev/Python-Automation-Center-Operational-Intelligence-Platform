import { buildAutomationRunResult } from "@/lib/mock-data";
import { parseJsonError, runAutomationPayloadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = runAutomationPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json({ status: "error", message: parseJsonError(parsed.error) }, { status: 400 });
    }

    const result = buildAutomationRunResult(parsed.data.automationId ?? parsed.data.slug ?? "", parsed.data.enabledRules);

    if (!result) {
      return Response.json({ status: "error", message: "Automacao nao encontrada." }, { status: 404 });
    }

    return Response.json(result);
  } catch {
    return Response.json({ status: "error", message: "Nao foi possivel processar a requisicao." }, { status: 400 });
  }
}
