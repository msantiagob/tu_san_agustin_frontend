import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  category?: string;
  description?: string;
}

interface Props {
  images: GalleryImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
}

export default function Carousel({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const id = window.setInterval(nextSlide, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [currentIndex, autoPlay, autoPlayInterval, images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!images?.length) return null;

  return (
    <div className="w-full p-4 md:p-6">
      {/* Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative aspect-video w-full overflow-hidden">
          {images.map((image, index) => (
            <div
              key={`slide-${index}`}
              className={[
                "absolute inset-0 transform transition-all duration-500 ease-in-out",
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : index < currentIndex
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0",
              ].join(" ")}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width ?? 1470}
                height={image.height ?? 980}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          type="button"
          className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/80 p-2"
          onClick={prevSlide}
          aria-label="Anterior"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/80 p-2"
          onClick={nextSlide}
          aria-label="Siguiente"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent p-12 text-white">
          <span className="mb-4 inline-block rounded-full bg-white/30 px-4 py-2 text-sm font-semibold backdrop-blur-sm shadow-lg">
            {images[currentIndex]?.category ?? "UI/UX Design"}
          </span>
          <h2 className="mb-4 text-5xl font-extrabold drop-shadow-lg">
            {images[currentIndex]?.alt}
          </h2>
          <p className="max-w-2xl text-lg text-gray-100 leading-relaxed drop-shadow-md">
            {images[currentIndex]?.description ?? ""}
          </p>
        </div>
      </div>
    </div>
  );
}
