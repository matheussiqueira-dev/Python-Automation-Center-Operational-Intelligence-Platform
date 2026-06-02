import { getSystemHealth } from "@/lib/mock-data";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(getSystemHealth());
}
