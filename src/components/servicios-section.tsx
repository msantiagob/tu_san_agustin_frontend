"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const servicios = [
  {
    id: 1,
    categoria: "GASTRONOMIA",
    titulo: "GASTRONOMIA",
    subtitulo: "Destacados",
    descripcion:
      "Puedes encontrar entre nuestros lugares para eventos, más que salones sociales, hoteles, fincas, haciendas, centros de convenciones y lugares campestres de gran categoría, exclusivos espacios con todos los servicios para hacer de tus eventos momentos únicos e irrepetibles.",
    imagen: "/uploads/Tu-San-Agustin-Home_54.webp",
  },
  {
    id: 2,
    categoria: "DECORACION",
    titulo: "DECORACION",
    subtitulo: "Destacados",
    descripcion:
      "cada evento es una oportunidad para expresar las necesidades, gustos y sentimientos de nuestros clientes a través de cada detalle, cada maravilloso espacio decorado fina y hermosamente para que vivas experiencias llenas de magia, alegría y diversión",
    imagen: "/uploads/tu-san-agustin-slider-home-008_extraLargeThumb.webp",
  },
  {
    id: 3,
    categoria: "FOTOGRAFIA",
    titulo: "lugares para eventos",
    subtitulo: "Destacados",
    descripcion:
      "Puedes encontrar entre nuestros lugares para eventos, más que salones sociales, hoteles, fincas, haciendas, centros de convenciones y lugares campestres de gran categoría, exclusivos espacios con todos los servicios para hacer de tus eventos momentos únicos e irrepetibles.",
    imagen: "/uploads/tu-san-agustin-slider-home-009.webp",
  },
];

const serviciosTexto = [
  "Gastronomía",
  "Decoración",
  "Event Planner",
  "Wedding Planner",
  "Fotografía y Video",
  "Alquiler de mobiliario",
];

function ServiciosSection() {
  return (
    <section className="--background py-16 relative overflow-hidden">
      <div className="absolute top-8 left-8 w-4 h-4 bg-teal-500 rounded-full opacity-60" />
      <div className="absolute bottom-8 right-8 w-6 h-6 bg-teal-500 rounded-full opacity-60" />

      <div className="container mx-auto px-4">
        <Carousel
          className="w-full"
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000 })]}
        >
          <CarouselContent>
            {servicios.map((servicio) => (
              <CarouselItem key={servicio.id}>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-6xl mx-auto">
                  <div className="w-full lg:w-1/2 max-w-md">
                    <Card className="overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={servicio.imagen || "/placeholder.svg"}
                          alt={servicio.categoria}
                          className="object-cover w-full h-full"
                          id="imgservicios"
                          loading="lazy"
                        />
                      </div>
                    </Card>
                  </div>

                  <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                    <div>
                      <h2 className="text-4xl lg:text-5xl font-light mb-2">
                        <span className="text-teal-500">SERVICIOS</span>
                      </h2>
                      <h3 className="text-4xl lg:text-5xl font-light text-white">
                        {servicio.subtitulo}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-bold text-lg tracking-wider">
                        {servicio.categoria}
                      </h4>

                      <div className="relative servicios-text">
                        <div className="absolute left-0 top-0 w-px h-full bg-gray-400 hidden lg:block" />
                        <p className="text-gray-300 leading-relaxed max-w-md mx-auto lg:mx-0 lg:pl-6">
                          {servicio.descripcion}
                        </p>
                      </div>
                    </div>

                    <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-medium">
                      Ver más
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 md:left-4 lg:-left-8 bg-teal-500 hover:bg-teal-600 border-teal-500 text-white" />
          <CarouselNext className="right-2 md:right-4 lg:-right-8 bg-teal-500 hover:bg-teal-600 border-teal-500 text-white" />
        </Carousel>
      </div>

      <div className="mt-16 pt-8 home-s3a ">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-center items-center gap-4 lg:gap-8 serviciostext">
            {serviciosTexto.map((servicio, index) => (
              <span key={index} className="text-gray-300 font-light text-lg lg:text-xl">
                {servicio}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-8 " />
      </div>
    </section>
  );
}

export default ServiciosSection;
