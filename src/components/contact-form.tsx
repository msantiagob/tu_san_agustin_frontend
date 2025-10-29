"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    eventType: "",
    message: "",
  });
  const [showWompiButton, setShowWompiButton] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const shouldShow = window.scrollY + window.innerHeight >= sectionTop;
      setShowWompiButton(shouldShow);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section ref={sectionRef} className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-500 mb-12">
            Contáctanos
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <Input
                type="text"
                placeholder="Nombre y Apellido *"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500"
                required
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 text-sm bg-red-100 px-2 py-1 rounded">
                *
              </span>
            </div>

            <Input
              type="tel"
              placeholder="Whatsapp *"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
              className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500"
              required
            />

            <Input
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500"
              required
            />

            <Select onValueChange={(value) => handleInputChange("eventType", value)}>
              <SelectTrigger className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700">
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quinceañera">Quinceañera</SelectItem>
                <SelectItem value="boda">Boda</SelectItem>
                <SelectItem value="cumpleaños">Cumpleaños</SelectItem>
                <SelectItem value="corporativo">Evento Corporativo</SelectItem>
                <SelectItem value="graduacion">Graduación</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Mensaje"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="w-full h-32 px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500 resize-none"
            />

            <Button
              type="submit"
              className="w-full h-14 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
            >
              Enviar
            </Button>
          </form>
        </div>
      </section>

      <a
        href="https://checkout.wompi.co/"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-white/95 px-4 py-2 shadow-xl border border-teal-500 transition-all duration-300 ${
          showWompiButton ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        }`}
        aria-label="Paga con Wompi"
      >
        <img
          src="uploads/Home-Tu-San-Agustin-pago-wompi.webp"
          alt="Pago con Wompi"
          className="h-8 w-8 object-contain"
          loading="lazy"
        />
        <span className="text-teal-600 font-semibold text-sm md:text-base">Paga con Wompi</span>
      </a>
    </>
  );
}
