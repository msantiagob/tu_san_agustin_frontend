"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import '../styles/style.css';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function EventosSection() {
  const eventos = [
    { id: 1, title: "15 años", image: "/uploads/Tu-San-Agustin-Home_03.webp" },
    { id: 2, title: "Eventos empresariales", image: "/uploads/Tu-San-Agustin-Home_04.webp" },
    { id: 3, title: "Bodas", image: "/uploads/Tu-San-Agustin-Home_01.webp" },
  ];

  // Duplicamos el contenido cuando hay pocos registros para que Embla
  // siempre tenga elementos con los que rellenar el viewport.
  const eventosSlides =
    eventos.length > 0 && eventos.length < 5 ? [...eventos, ...eventos] : eventos;

  const servicios = ["Eventos Sociales", "Eventos Empresariales", "Servicios Institucionales"];

  return (
    <section className="-mt-1 py-0 px-4 carouselartistas" id="eventos-section">
      <div className="w-full max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
          <span className="text-teal-400">Eventos</span>{" "}
          <span className="text-white">únicos</span>
        </h2>

        <div className="relative mb-16">
          <Carousel
            className="w-full"
            opts={{ align: "center", loop: true, containScroll: "trimSnaps" }}
            plugins={[Autoplay({ delay: 4500 })]}  // autoplay activo
          >
            <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-8">
              <CarouselPrevious
                aria-label="Anterior"
                className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-teal-500/80 text-white shadow-lg border border-teal-500/20 hover:bg-teal-500"
              />

              <div className="flex-1 w-full max-w-[360px] sm:max-w-none">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {eventosSlides.map((evento, index) => (
                    <CarouselItem
                      key={`${evento.id}-${index}`}
                      className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 flex justify-center"
                    >
                      <div className="flex w-full max-w-[340px] flex-col items-center">
                        <Card className="w-full bg-white rounded-2xl border border-gray-300/60 shadow-md">
                          <CardContent className="p-3 flex flex-col h-full">
                            {/* Imagen */}
                            <div className="overflow-hidden rounded-xl">
                              <img
                                src={evento.image || "/placeholder.svg"}
                                alt={evento.title}
                                className="w-full aspect-square object-cover"
                                loading="lazy"
                              />
                            </div>
                            {/* Título */}
                            <h3 className="mt-3 text-center custom-caption">
                              {evento.title}
                            </h3>
                          </CardContent>
                        </Card>

                        <div className="mt-3">
                          <Button className="btn btn-custom">VER MÁS</Button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>

              <CarouselNext
                aria-label="Siguiente"
                className="!static !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-teal-500/80 text-white shadow-lg border border-teal-500/20 hover:bg-teal-500"
              />
            </div>
          </Carousel>
        </div>

        <div
          id="services-footer"
          className="--background relative w-full py-6 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24
                     before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-screen before:border-t before:border-white/60
                     after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-screen after:border-b after:border-white/60"
        >
          {servicios.map((servicio, index) => (
            <p key={index} className="text-white text-lg md:text-xl text-center serviciostext">
              {servicio}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
