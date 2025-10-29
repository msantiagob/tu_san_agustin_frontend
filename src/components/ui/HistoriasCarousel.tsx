"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

type Story = {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
};

export default function HistoriasCarousel({ stories }: { stories: Story[] }) {
  const slides = stories.length < 6 ? [...stories, ...stories] : stories;

  return (
    <Carousel
      className="w-full max-w-6xl mx-auto px-4"
      opts={{ align: "start", loop: true, containScroll: "keepSnaps", slidesToScroll: 1 }}
      plugins={[Autoplay({ delay: 6000 })]}
    >
      <div className="flex items-center gap-3 md:gap-6">
        <CarouselPrevious className="hidden md:flex !static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900" />

        <div className="flex-1 w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {slides.map((story, index) => (
              <CarouselItem
                key={`${story.id}-${index}`}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col items-center h-full">
                  <div className="relative flex justify-center -mb-16 z-20">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <Card className="bg-white rounded-3xl p-6 pt-20 shadow-lg w-full max-w-sm sm:max-w-md text-center flex flex-col flex-1">
                    <p className="text-gray-600 text-sm leading-relaxed text-justify mb-6 flex-1">
                      {story.description}
                    </p>

                    <h3 className="text-teal-600 text-lg font-medium mb-6">
                      {story.title}
                    </h3>

                    <div className="flex justify-center">
                      <button className="bg-teal-400 hover:bg-teal-500 text-black font-medium px-6 py-2 rounded-full transition-colors">
                        Ver más
                      </button>
                    </div>
                  </Card>

                  <div className="mt-4">
                    <a
                      href="#"
                      className="text-sm font-medium text-teal-600 hover:text-teal-500 flex items-center gap-1"
                    >
                      {story.category} <span aria-hidden="true">›</span>
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <CarouselNext className="hidden md:flex !static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900" />
      </div>

      <div className="mt-6 flex justify-center gap-4 md:hidden">
        <CarouselPrevious className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto h-10 w-10 rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900" />
        <CarouselNext className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto h-10 w-10 rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900" />
      </div>
    </Carousel>
  );
}
