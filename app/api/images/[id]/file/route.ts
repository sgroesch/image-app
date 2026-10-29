import type { NextRequest } from "next/server";
import { getImageFile } from "@/lib/storage";

export async function GET(_request: NextRequest, ctx: RouteContext<"/api/images/[id]/file">) {
  const { id } = await ctx.params;
  const file = await getImageFile(id);
  if (!file) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(file.bytes, { headers: { "Content-Type": file.type } });
}
