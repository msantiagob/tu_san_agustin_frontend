"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const awards = [
    { id: 1, title: "Premio 1", image: "/uploads/Tu-San-Agustin-Home_62.webp" },
    { id: 2, title: "Cert ISO", image: "/uploads/091a2262-95c1-4ae8-b6f6-c81d3d355212.webp" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % awards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + awards.length) % awards.length);
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Lado izquierdo */}
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start">
              <div className="w-40">
                <img
                  src="uploads/Tu-San-Agustin_Logo_verde-300x156.webp"
                  alt="Logo Tu San Agustín"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-teal-500">Conócenos</span>
                <br />
                <span className="text-gray-700">¿Quiénes somos?</span>
              </h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 text-lg leading-relaxed">
                Somos Tu San Agustín, la empresa líder en operación de eventos. Con más de 35 años,
                ofrecemos soluciones integrales y personalizadas para cualquier tipo de evento.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full text-lg">
                Ver más
              </Button>
            </div>
          </div>

          {/* Lado derecho: carrusel */}
          <div className="space-y-8 flex flex-col items-center text-center">
            <div>
              <h3 className="text-2xl text-gray-600 mb-2">Premios y</h3>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-700">Certificaciones</h2>
            </div>

            <div className="relative w-full max-w-sm">
              {/* Carousel */}
              <div className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm">
                <div
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {awards.map((award) => (
                    <div key={award.id} className="w-full flex-shrink-0">
                      <div className="flex justify-center">
                        <div className="w-40 h-48 flex items-center justify-center">
                          <img
                            src={award.image}
                            alt={award.title}
                            className="max-w-[90%] max-h-[80%] object-contain"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controles */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
                  aria-label="Siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-4">
                {awards.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? "bg-teal-500" : "bg-gray-300"
                    }`}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
