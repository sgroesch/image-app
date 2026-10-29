import type { ImageMeta } from "./types";

export async function listImages(query = ""): Promise<ImageMeta[]> {
  const params = new URLSearchParams({ q: query });
  const res = await fetch(`/api/images?${params}`, { cache: "no-store" });
  const body = (await res.json()) as { images: ImageMeta[] };
  return body.images;
}

export async function uploadImage(file: File): Promise<ImageMeta> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/images", { method: "POST", body });
  return (await res.json()) as ImageMeta;
}

export async function deleteImage(id: string): Promise<void> {
  await fetch(`/api/images/${encodeURIComponent(id)}`, { method: "DELETE" });
}
