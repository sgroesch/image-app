import type { NextRequest } from "next/server";
import { deleteImage, getImageFile } from "@/lib/storage";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  const file = await getImageFile(id);
  if (!file) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(file.bytes, { headers: { "Content-Type": file.type } });
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const { id } = await params;
  await deleteImage(id);
  return new Response(null, { status: 204 });
}
