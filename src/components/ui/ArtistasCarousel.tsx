"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Artist = { name: string; image: string };

export default function ArtistasCarousel({ artists }: { artists: Artist[] }) {
  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {artists.map((artist, i) => (
          <CarouselItem
            key={`${artist.name}-${i}`}
            className="pl-2 md:pl-4 basis-full md:basis-1/3 lg:basis-1/3"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-600">
                  <img
                    src={artist.image || "/placeholder.svg"}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="text-teal-400 text-xl font-medium">{artist.name}</h3>
              <button
                type="button"
                className="bg-teal-600 text-white font-medium px-6 py-2 rounded-full hover:bg-teal-700 transition-colors"
              >
                Ver más
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        aria-label="Anterior"
        className="left-2 md:left-4 lg:-left-8 bg-white hover:bg-gray-100 border-0 w-12 h-12 shadow-lg"
      />
      <CarouselNext
        aria-label="Siguiente"
        className="right-2 md:right-4 lg:-right-8 bg-white hover:bg-gray-100 border-0 w-12 h-12 shadow-lg"
      />
    </Carousel>
  );
}
