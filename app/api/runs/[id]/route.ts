import { getExecutions } from "@/lib/executions";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const run = getExecutions().find((execution) => execution.id === id);

  if (!run) {
    return Response.json({ status: "error", message: "Execucao nao encontrada." }, { status: 404 });
  }

  return Response.json({ run });
}
