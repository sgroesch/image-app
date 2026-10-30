import { ImageGallery } from "@/components/ImageGallery";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <h1 className="font-display text-5xl tracking-tight text-headline">
          Image Gallery
        </h1>
      <ImageGallery />
    </main>
  );
}
