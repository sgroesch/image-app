"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import * as api from "@/lib/api";
import type { ImageMeta } from "@/lib/types";

export function ImageGallery() {
  const [images, setImages] = useState<ImageMeta[]>([]);

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

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={image.name} width={200} />
            <p>{image.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
