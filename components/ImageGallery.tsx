"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import * as api from "@/lib/api";
import type { ImageMeta } from "@/lib/types";

export function ImageGallery() {
  const [images, setImages] = useState<ImageMeta[]>([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let stale = false;
    const timer = setTimeout(async () => {
      const results = await api.listImages(query);
      if (!stale) setImages(results);
    }, 250);
    return () => {
      stale = true;
      clearTimeout(timer);
    };
  }, [query]);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    await api.uploadImage(file);
    setImages(await api.listImages(query));
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

      <div className="mt-10 flex items-center justify-between gap-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search images"
          aria-label="Search images"
          className="h-10 w-full max-w-sm rounded-full border border-secondary bg-transparent px-5 text-sm text-headline placeholder:text-paragraph focus-visible:border-highlight focus-visible:outline-2 focus-visible:outline-highlight"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-button px-5 text-sm font-medium text-button-text cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
        >
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
            <path d="M10 3a1 1 0 0 1 .7.3l4 4a1 1 0 1 1-1.4 1.4L11 6.42V13a1 1 0 1 1-2 0V6.41L6.7 8.7a1 1 0 0 1-1.4-1.4l4-4A1 1 0 0 1 10 3ZM4 15a1 1 0 0 1 1 1v.5h10V16a1 1 0 1 1 2 0v1.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V16a1 1 0 0 1 1-1Z" />
          </svg>
          Upload
        </button>
      </div>

      {images.length === 0 ? (
        <p className="mt-10 rounded-2xl border py-20 text-center">
          {query ? `No images match ${query}` : "No images yet. Upload one to get started."}
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <li key={image.id} className="group">
              <div className="relative overflow-hidden rounded-2xl ring-highlight group-hover:ring-2">
                <img
                  src={image.url}
                  alt={image.name}
                  className="aspect-4/3 w-full object-cover transition hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => handleDelete(image.id)}
                  aria-label={`Delete ${image.name}`}
                  className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-background text-headline transition cursor-pointer hover:bg-button focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
                >
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                    <path fillRule="evenodd" d="M8.75 2a1.75 1.75 0 0 0-1.7 1.33L6.87 4H4a1 1 0 0 0 0 2h.17l.7 9.06A2 2 0 0 0 6.86 17h6.28a2 2 0 0 0 2-1.94L15.83 6H16a1 1 0 1 0 0-2h-2.87l-.17-.67A1.75 1.75 0 0 0 11.25 2h-2.5Zm-.5 6a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0v-5A.75.75 0 0 1 8.25 8Zm4.25.75a.75.75 0 0 0-1.5 0v5a.75.75 0 0 0 1.5 0v-5Z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
              <p className="mt-3 truncate text-sm text-headline group-hover:text-highlight">{image.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
