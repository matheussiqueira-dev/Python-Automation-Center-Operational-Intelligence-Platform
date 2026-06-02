import { getExecutions } from "@/lib/executions";
import { executionQuerySchema, parseJsonError } from "@/lib/validators";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = executionQuerySchema.safeParse({
    status: searchParams.get("status") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    severity: searchParams.get("severity") ?? undefined,
  });

  if (!parsed.success) {
    return Response.json({ status: "error", message: parseJsonError(parsed.error) }, { status: 400 });
  }

  return Response.json({ executions: getExecutions(parsed.data) });
}
