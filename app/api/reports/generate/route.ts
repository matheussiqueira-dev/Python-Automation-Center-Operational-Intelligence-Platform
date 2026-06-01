import { buildReportPayload } from "@/lib/reports";
import { parseJsonError, reportPayloadSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = reportPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json({ status: "error", message: parseJsonError(parsed.error) }, { status: 400 });
    }

    const report = buildReportPayload(parsed.data.automationSlug);

    if (!report) {
      return Response.json({ status: "error", message: "Relatorio nao encontrado." }, { status: 404 });
    }

    return Response.json(report);
  } catch {
    return Response.json({ status: "error", message: "Nao foi possivel gerar o relatorio." }, { status: 400 });
  }
}
