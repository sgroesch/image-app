import type { ImageMeta } from "./types";

interface StoredImage {
  id: string;
  name: string;
  type: string;
  bytes: Uint8Array<ArrayBuffer>;
}

const globalStore = globalThis as typeof globalThis & {
  __imageStore?: Map<string, StoredImage>;
};
const store: Map<string, StoredImage> = (globalStore.__imageStore ??= new Map());

function toPublic(image: StoredImage): ImageMeta {
  return { id: image.id, name: image.name, url: `/api/images/${image.id}/file` };
}

export async function saveImage(input: {
  name: string;
  type: string;
  bytes: Uint8Array<ArrayBuffer>;
}): Promise<ImageMeta> {
  const image = { id: crypto.randomUUID(), ...input };
  store.set(image.id, image);
  return toPublic(image);
}

export async function listImages(): Promise<ImageMeta[]> {
  return [...store.values()].map(toPublic);
}

export async function getImageFile(id: string): Promise<StoredImage | null> {
  return store.get(id) ?? null;
}
