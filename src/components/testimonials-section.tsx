"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";

const testimonials = [
  {
    id: 1,
    image: "/placeholder.svg?height=120&width=120",
    text: "Laura & Andrés una historia de amor realizada en nuestro lugar para eventos Fincadool en esta historia se refleja la felicidad y pasión de una pareja que nos dió su entera confianza para capturar momentos que serán recordados para toda la vida.",
    link: "Laura y Andrés Boda",
    linkUrl: "#",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=120&width=120",
    text: "Fiesta de 15 años realizada en nuestra alias Fincal Forest en Envigado, ideal para realizar fiestas y celebraciones llenas de magia y diversión, cuenta con este maravilloso lugar y el mejor servicio de San Agustín.",
    link: "Fiesta de 15 Años Mariam",
    linkUrl: "#",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=120&width=120",
    text: "Realizamos celebración de los 50 años de Mileusbin, un evento empresarial en el que ofrecimos un servicio integral en la operación y logística en nuestro lugar para eventos Orquiderama Jardín Botánico.",
    link: "Mileusbin",
    linkUrl: "#",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="py-12 px-4">
      {/* Title */}
      <h2 className="text-center text-3xl md:text-4xl  mb-12">
        <span className="text-[#4a9a8c]">Historias</span>{" "}
        <span className="text-[#3a3a3a]">de eventos reales</span>
      </h2>

      {/* Carousel Container */}
      <div className="flex items-center justify-center gap-4 max-w-6xl mx-auto">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="text-[#3a3a3a] hover:text-[#4a9a8c] transition-colors flex-shrink-0"
          aria-label="Previous"
        >
          <ChevronLeft className="w-10 h-10" strokeWidth={1.5} />
        </button>

        <div className="flex gap-4 items-end justify-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              image={testimonial.image}
              text={testimonial.text}
              link={testimonial.link}
              linkUrl={testimonial.linkUrl}
              isCenter={index === 1}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="text-[#3a3a3a] hover:text-[#4a9a8c] transition-colors flex-shrink-0"
          aria-label="Next"
        >
          <ChevronRight className="w-10 h-10" strokeWidth={1.5} />
        </button>
      </div>

      {/* Ver testimonios with stars */}
      <div className="flex flex-col items-center mt-12">
        <span className="text-[#3a3a3a] text-lg mb-2">Ver testimonios</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-6 h-6 fill-[#f5a623] text-[#f5a623]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
