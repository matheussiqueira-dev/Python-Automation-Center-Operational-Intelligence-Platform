import { analyzeDatasetById } from "@/lib/data-quality";
import { dataQualityPayloadSchema, parseJsonError } from "@/lib/validators";

const MAX_BODY_BYTES = 100_000;

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_BYTES) {
    return Response.json({ status: "error", message: "Payload muito grande para simulacao." }, { status: 413 });
  }

  try {
    const json = await request.json();
    const parsed = dataQualityPayloadSchema.safeParse(json);

    if (!parsed.success) {
      return Response.json({ status: "error", message: parseJsonError(parsed.error) }, { status: 400 });
    }

    const report = analyzeDatasetById(parsed.data.datasetId);

    if (!report) {
      return Response.json({ status: "error", message: "Dataset nao encontrado." }, { status: 404 });
    }

    return Response.json({ report });
  } catch {
    return Response.json({ status: "error", message: "Nao foi possivel processar a requisicao." }, { status: 400 });
  }
}
