import type { NextRequest } from "next/server";
import { listImages, saveImage } from "@/lib/storage";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const images = await listImages(query);
  return Response.json({ images });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;
  const bytes = new Uint8Array(await file.arrayBuffer());
  const image = await saveImage({ name: file.name, type: file.type, bytes });
  return Response.json(image, { status: 201 });
}
