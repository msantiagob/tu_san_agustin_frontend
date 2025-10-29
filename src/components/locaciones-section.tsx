"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function LocacionesSection() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  // Autoplay cada 3s cuando la API esta lista
  useEffect(() => {
    if (!carouselApi) return;
    const id = setInterval(() => carouselApi.scrollNext(), 3000);
    return () => clearInterval(id);
  }, [carouselApi]);

  const locaciones = [
    { nombre: "Medellín", imagen: "/uploads/Tu-San-Agustin-Home_08.webp", enlace: "Ver ciudades" },
    { nombre: "Rionegro", imagen: "/uploads/Tu-San-Agustin-Home_10.webp", enlace: "Ver todos los destinos" },
    { nombre: "Envigado", imagen: "/uploads/Tu-San-Agustin-Home_05.webp", enlace: "Ver países" },
  ];

  // Duplicamos para efecto "infinito" visual
  const duplicatedLocaciones = [...locaciones, ...locaciones, ...locaciones];

  return (
    <section className="--background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Titulo */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            <span className="text-teal-400">Locaciones</span>{" "}
            <span className="text-white">para tus eventos</span>
          </h2>
        </div>

        <div className="mb-12 px-4" id="locacionescarousel">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "center", loop: true, skipSnaps: false, dragFree: false, containScroll: "trimSnaps" }}
            className="w-full"
          >
            <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-8">
              <CarouselPrevious className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900 [&>*]:pointer-events-none">
                <span className="text-xl leading-none md:text-2xl">&lsaquo;</span>
              </CarouselPrevious>

              <div className="flex-1 w-full max-w-[360px] sm:max-w-none">
                <CarouselContent className="!ml-0 md:-ml-4 px-0">
                  {duplicatedLocaciones.map((locacion, index) => (
                    <CarouselItem
                      key={`${locacion.nombre}-${index}`}
                      className="basis-full md:basis-1/2 lg:basis-1/3 pl-0 md:pl-4"
                    >
                      <div className="flex w-full flex-col items-center flex-wrap justify-center gap-6">
                        <Card className="overflow-hidden rounded-3xl border-0 shadow-lg bg-transparent w-full max-w-[320px] sm:max-w-[340px] lg:max-w-none !py-0 gap-0 mx-auto">
                          <div className="relative">
                            <img
                              src={locacion.imagen || "/placeholder.svg"}
                              alt={`Venue en ${locacion.nombre}`}
                              className="w-full h-[22rem] sm:h-[24rem] object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none">
                              <div className="px-4 py-1.5 rounded-full bg-neutral-900/85 text-white shadow-md ring-1 ring-white/10">
                                <h3 className="text-sm font-medium leading-none tracking-wide text-center">
                                  {locacion.nombre}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </Card>

                        {/* Enlace debajo de cada tarjeta */}
                        <button className="text-white hover:text-teal-400 transition-colors duration-200 flex items-center gap-2 group">
                          <span className="text-sm font-medium underline decoration-1 underline-offset-2">
                            {locacion.enlace}
                          </span>
                          <svg
                            className="w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>

              <CarouselNext className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white text-neutral-700 shadow-lg transition-colors hover:text-neutral-900 [&>*]:pointer-events-none">
                <span className="text-xl leading-none md:text-2xl">&rsaquo;</span>
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        {/* Boton central */}
        <div className="flex justify-center">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200">
            Quiero Reservar
          </Button>
        </div>
      </div>
    </section>
  );
}

