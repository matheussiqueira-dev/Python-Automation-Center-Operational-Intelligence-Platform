import { getExecutions } from "@/lib/executions";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({ runs: getExecutions() });
}
