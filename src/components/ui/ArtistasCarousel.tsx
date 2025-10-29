"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Artist = { name: string; image: string };

export default function ArtistasCarousel({ artists }: { artists: Artist[] }) {
  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
    >
      <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-6">
        <CarouselPrevious className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900 [&>*]:pointer-events-none">
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </CarouselPrevious>

        <div className="flex-1 w-full max-w-[360px] sm:max-w-none">
          <CarouselContent className="!ml-0 md:-ml-4 px-0">
            {artists.map((artist, i) => (
              <CarouselItem
                key={`${artist.name}-${i}`}
                className="basis-full md:basis-1/3 lg:basis-1/3 px-0 md:px-0 md:pl-4"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative flex justify-center">
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
        </div>

        <CarouselNext className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900 [&>*]:pointer-events-none">
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </CarouselNext>
      </div>
    </Carousel>
  );
}
