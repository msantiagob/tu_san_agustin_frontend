"use client";

import { useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

type Gallery = { image: string; label?: string };

type Props = {
  galleries?: Gallery[];
  autoPlayMs?: number; // default 3000
};

export default function GaleriasSection({
  galleries = [
    { image: "/uploads/Tu-San-Agustin-Home_30.webp", label: "Fiesta de 15 años" },
    { image: "/uploads/Tu-San-Agustin-Home_32.webp", label: "Celebraciones" },
    { image: "/uploads/Tu-San-Agustin-Home_34.webp", label: "Event & Wedding Planner" },
  ],
  autoPlayMs = 3000,
}: Props) {
  const api = useRef<CarouselApi | undefined>(undefined);

  useEffect(() => {
    if (!api.current) return;
    const id = setInterval(() => api.current?.scrollNext(), autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs]);

  const setApi = (carouselApi: CarouselApi) => {
    api.current = carouselApi;
  };

  // duplicamos para sensación de infinito suave (además de loop)
  const duplicated = [...galleries, ...galleries, ...galleries];

  return (
    <section className="py-16 --background" aria-label="Galerías de experiencias">
      <div className="container mx-auto px-4">
        {/* Título */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-teal-600">Galerías</span>{" "}
          <span className="text-white">de Experiencias</span>
        </h2>

        {/* Carrusel */}
        <div className="relative max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: false,
              containScroll: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {duplicated.map((g, i) => (
                <CarouselItem
                  key={`${g.image}-${i}`}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative w-[280px] h-[415px] rounded-2xl overflow-hidden mx-auto">
                    {/* Imagen */}
                    <img
                      src={g.image || "/placeholder.svg"}
                      alt={g.label || `Galería ${i + 1}`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                      width={280}
                      height={415}
                    />
                    {/* Overlay etiqueta */}
                    {g.label && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-full px-8 py-2 shadow-md min-w-[180px] flex justify-center">
                          <p className="text-gray-900 text-sm font-medium text-center truncate">
                            {g.label}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious
              aria-label="Anterior"
              className="left-2 md:left-4 lg:-left-8 w-12 h-12 bg-white/90 hover:bg-white border-0"
            />
            <CarouselNext
              aria-label="Siguiente"
              className="right-2 md:right-4 lg:-right-8 w-12 h-12 bg-white/90 hover:bg-white border-0"
            />
          </Carousel>
        </div>

        {/* Ver más */}
        <div className="flex justify-center mt-8">
          <div className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-full cursor-pointer transition-colors">
            Ver más
          </div>
        </div>
      </div>
    </section>
  );
}
