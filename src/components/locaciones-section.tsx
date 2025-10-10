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

  // Autoplay cada 3s cuando la API esté lista
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

  // Duplicamos para efecto “infinito” visual
  const duplicatedLocaciones = [...locaciones, ...locaciones, ...locaciones];

  return (
    <section className="--background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-center">
            <span className="text-teal-400">Locaciones</span>{" "}
            <span className="text-white">para tus eventos</span>
          </h2>
        </div>

        <div className="mb-12 px-4" id="locacionescarousel">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", loop: true, skipSnaps: false, dragFree: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {duplicatedLocaciones.map((locacion, index) => (
                <CarouselItem
                  key={`${locacion.nombre}-${index}`}
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/2 xl:basis-1/3"
                >
                  <div className="flex flex-col items-center flex-wrap justify-center gap-6">
                    <Card className="overflow-hidden rounded-3xl border-0 shadow-lg bg-transparent w-full max-w-[250px] !py-0 gap-0">
                      <div className="relative">
                        <img
                          src={locacion.imagen || "/placeholder.svg"}
                          alt={`Venue en ${locacion.nombre}`}
                          className="w-full h-[22rem] object-cover"
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

            <CarouselPrevious className="bg-teal-600 hover:bg-teal-700 text-white border-0 left-2 md:left-4 lg:-left-8 h-12 w-12" />
            <CarouselNext className="bg-teal-600 hover:bg-teal-700 text-white border-0 right-2 md:right-4 lg:-right-8 h-12 w-12" />
          </Carousel>
        </div>

        {/* Botón central */}
        <div className="flex justify-center">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors duration-200">
            Quiero Reservar
          </Button>
        </div>
      </div>
    </section>
  );
}
