"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { FaWhatsapp, FaRegEnvelope } from "react-icons/fa6";

type BlogPost = { image: string; category: string; title: string };

const blogPostsDefault: BlogPost[] = [
  {
    image: "/uploads/Tu-San-Agustin-Home_47.webp",
    category: "Bodas destino",
    title:
      "Alimentación Hospitalaria: Un Pilar Fundamental en la Recuperación y Bienestar del Paciente",
  },
  {
    image: "/uploads/Tu-San-Agustin-Home_50.webp",
    category: "Mejores lugares para eventos",
    title: "El destino perfecto para tu boda de ensueño",
  },
  {
    image: "/uploads/Tu-San-Agustin-Home_53.webp",
    category: "Alimentación hospitalaria",
    title: "¡Descubre los 20 Mejores Lugares para Eventos en Medellín!",
  },
];

export default function BlogsSection({
  posts = blogPostsDefault,
  autoPlayMs = 3000,
}: {
  posts?: BlogPost[];
  autoPlayMs?: number;
}) {
  const api = useRef<CarouselApi | undefined>(undefined);

  // autoplay
  useEffect(() => {
    if (!api.current) return;
    const id = setInterval(() => api.current?.scrollNext(), autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs]);

  const duplicated = [...posts, ...posts, ...posts];

  return (
    <section
      className="home-s11 py-[30px] bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/uploads/Tu-San-Agustin-Home_back-section_29.webp')" }}
      aria-label="Blogs, ideas y consejos"
    >
      <div className="section-content relative max-w-7xl mx-auto px-4">
        {/* Título */}
        <div className="row mb-8">
          <div className="col w-full">
            <h2 className="text-center text-4xl lg:text-5xl font-['Alice'] text-[#333638]">
              <span className="text-[#4eac9f] font-bold">Blogs,</span> ideas y consejos
            </h2>
          </div>
        </div>

        {/* Carrusel */}
        <div className="row-collapse align-center">
          <div className="col w-full">
            <Carousel
              setApi={(carouselApi) => {
                api.current = carouselApi;
              }}
              opts={{
                align: "start",
                loop: true,
                skipSnaps: false,
                dragFree: false,
                containScroll: false,
              }}
              className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
            >
              <CarouselContent>
                {duplicated.map((post, index) => (
                  <CarouselItem
                    key={`${post.image}-${index}`}
                    className="md:basis-1/2 lg:basis-1/3 p-4"
                  >
                    <Card className="col-inner text-center border-none rounded-2xl overflow-hidden flex flex-col h-full shadow-none">
                      <CardContent className="p-0 relative">
                        <div className="img-container rounded-t-2xl overflow-hidden">
                          <img
                            loading="lazy"
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-auto aspect-[3/2] object-cover"
                            width={900}
                            height={600}
                          />
                        </div>
                        <p className="blog-category-chip absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/70 text-[#333638] text-base px-4 py-1 rounded-full font-['Alice'] whitespace-nowrap">
                          {post.category}
                        </p>
                      </CardContent>

                      <CardFooter className="flex flex-col flex-grow items-center justify-between p-6 pt-10">
                        <p className="text-[#333638] text-lg leading-tight mb-4 flex-grow">
                          {post.title}
                        </p>
                        <Button variant="default" className="btnblogs">
                          Ver más
                        </Button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="hidden lg:inline-flex" aria-label="Anterior" />
              <CarouselNext className="hidden lg:inline-flex" aria-label="Siguiente" />
            </Carousel>
          </div>
        </div>

        {/* Descubre más */}
        <div className="row mt-12 mb-8">
          <div className="col w-full">
            <h2 className="text-center descubremas">
              Descubre más de <br />
              <span className="text-[#4eac9f] font-bold">Tu San Agustín</span>
            </h2>
          </div>
        </div>

        {/* Suscripción */}
        <div className="row-collapse news-row flex flex-wrap items-center max-w-4xl mx-auto">
          <div className="w-full lg:w-5/12">
            <div className="col-inner">
              <p className="text-[#333638] text-3xl flex items-center justify-center lg:justify-start gap-4 btnboletin">
                Suscríbete al boletín
                <span className="text-[#4eac9f] flex items-center gap-2">
                  <FaWhatsapp className="text-3xl" />
                  <FaRegEnvelope className="text-3xl" />
                </span>
              </p>
            </div>
          </div>

          <div className="w-full lg:w-7/12 mt-4 lg:mt-0">
            <div className="col-inner">
              <form
                className="form-flat flex gap-2"
                onSubmit={(e) => {
                  // evita recarga accidental si luego conectas a un servicio
                  e.preventDefault();
                }}
              >
                <Input
                  type="email"
                  placeholder="Escribe tu correo *"
                  className="bg-[#f3f3f3] rounded-full border-transparent focus:ring-2 focus:ring-[#4eac9f]"
                  required
                />
                <Button type="submit" className="bg-[#4eac9f] hover:bg-[#429387] text-white rounded-full capitalize">
                  Suscribirme
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
