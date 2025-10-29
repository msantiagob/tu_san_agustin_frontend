"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function HeroSection() {
  const slides = [
    {
      image: "uploads/Tu-San-Agustin-Home_02.webp",
      alt: "Quincea{eracelebration with elegant red dress and romantic carriage setting",
      title: "« Momentos para toda la vida »",
    },
    {
      image: "uploads/photo_2025-08-12_15-59-22.webp",
      alt: "QuinceaÃ±era celebration with elegant red dress and romantic carriage setting",
      title: "Quince años",
    },
    {
      image: "/uploads/photo_2025-08-12_15-59-27.webp",
      alt: "Elegant quinceaÃ±era party venue with pink decorations",
      title: "Gastronomia",
    },
    {
      image: "/uploads/photo_2025-08-12_15-59-28.webp",
      alt: "QuinceaÃ±era in blue dress in beautiful garden setting",
      title: "Lugares para eventos",
    },
    {
      image: "/uploads/photo_2025-08-12_15-59-23.webp",
      alt: "QuinceaÃ±era in blue dress in beautiful garden setting",
      title: "Fotografia",
    },
    {
      image: "/uploads/photo_2025-08-12_15-59-31.webp",
      alt: "QuinceaÃ±era in blue dress in beautiful garden setting",
      title: "Bodas",
    },
    {
      image: "/uploads/photo_2025-08-12_15-59-32.webp",
      alt: "QuinceaÃ±era in blue dress in beautiful garden setting",
      title: "Fiesta de quince aÃ±os",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaApi, setEmblaApi] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    setCurrentSlide(emblaApi.selectedScrollSnap());
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    const target = `https://www.tusanagustin.com/buscar?search=${encodeURIComponent(query)}`;
    if (typeof window !== "undefined") {
      window.location.href = target;
    }
  };

  return (
    <div className="relative overflow-hidden -mb-1">
      <Carousel
        className="w-full"
        opts={{ loop: true, align: "start" }}
        plugins={[Autoplay({ delay: 5000 })]}
        setApi={setEmblaApi}
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[663.781px] max-w-[1905px] mx-auto">
                <img
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white pointer-events-none">
                  <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
                    <h1
                      className="text-4xl sm:text-3xl md:text-5xl lg:text-5xl mb-6 md:mb-8"
                      id="herotext"
                    >
                      {index === currentSlide ? slide.title : ""}
                    </h1>

                    <div className="mb-6 md:mb-8 flex justify-center">
                      <a
                        href="https://api.whatsapp.com/send/?phone=573168753305&amp;text=Hola%21&amp;type=phone_number&amp;app_absent=0"
                        className="btn btn-gold btn-lg shadow animate__animated animate__pulse animate__infinite mb-5 pointer-events-auto"
                      >
                        Agenda una asesoria con Expertos
                      </a>
                    </div>

                    <div className="flex justify-center">
                      <form
                        className="flex flex-col sm:flex-row items-center gap-2 bg-white rounded-full p-2 w-full max-w-sm md:max-w-md pointer-events-auto"
                        onSubmit={handleSearch}
                      >
                        <Input
                          value={searchTerm}
                          onChange={(event) => setSearchTerm(event.target.value)}
                          placeholder="Buscar por nombre o categoria"
                          className="border-none bg-transparent text-gray-700 placeholder:text-gray-500 flex-1 px-4 text-sm md:text-base h-10"
                        />
                        <Button
                          type="submit"
                          className="bg-teal-600 hover:bg-teal-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium"
                        >
                          Buscar
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-teal-600/90 hover:bg-teal-600 text-white border-none hover:scale-110 transition-all duration-200" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-teal-600/90 hover:bg-teal-600 text-white border-none hover:scale-110 transition-all duration-200" />
      </Carousel>
    </div>
  );
}

export default HeroSection;
