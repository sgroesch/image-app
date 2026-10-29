"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import * as api from "@/lib/api";
import type { ImageMeta } from "@/lib/types";

export function ImageGallery() {
  const [images, setImages] = useState<ImageMeta[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    api.listImages().then(setImages);
  }, []);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    const image = await api.uploadImage(file);
    setImages((current) => [...current, image]);
  }

  async function handleDelete(id: string) {
    await api.deleteImage(id);
    setImages((current) => current.filter((image) => image.id !== id));
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-button px-4 text-sm font-medium text-button-text transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path d="M10 3a1 1 0 0 1 .7.3l4 4a1 1 0 1 1-1.4 1.4L11 6.42V13a1 1 0 1 1-2 0V6.41L6.7 8.7a1 1 0 0 1-1.4-1.4l4-4A1 1 0 0 1 10 3ZM4 15a1 1 0 0 1 1 1v.5h10V16a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V16a1 1 0 0 1 1-1Z" />
        </svg>
        Upload
      </button>
      <ul className="mt-8 flex flex-col gap-8">
        {images.map((image) => (
          <li key={image.id}>
            <div className="relative w-fit">
              <img src={image.url} alt={image.name} width={200} />
              <button
                type="button"
                onClick={() => handleDelete(image.id)}
                aria-label={`Delete ${image.name}`}
                className="absolute top-2 right-2 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-headline transition-colors hover:bg-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
              >
                Delete
              </button>
            </div>
            <p className="mt-2">{image.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
