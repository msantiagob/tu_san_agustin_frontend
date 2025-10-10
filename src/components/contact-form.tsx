"use client";

import type React from "react";
import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // aquí podrías hacer fetch a tu backend o servicio de email
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-teal-500 mb-12">
          Contáctanos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre */}
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

          {/* WhatsApp */}
          <Input
            type="tel"
            placeholder="Whatsapp *"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500"
            required
          />

          {/* Email */}
          <Input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500"
            required
          />

          {/* Tipo de evento */}
          <Select
            onValueChange={(value) => handleInputChange("eventType", value)}
          >
            <SelectTrigger className="w-full h-14 px-4 bg-gray-100 border-0 rounded-lg text-gray-700">
              <SelectValue placeholder="Tipo de Evento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quinceañera">Quinceañera</SelectItem>
              <SelectItem value="boda">Boda</SelectItem>
              <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
              <SelectItem value="corporativo">Evento Corporativo</SelectItem>
              <SelectItem value="graduacion">Graduación</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>

          {/* Mensaje */}
          <Textarea
            placeholder="Mensaje"
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            className="w-full h-32 px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder:text-gray-500 resize-none"
          />

          {/* Botón enviar */}
          <Button
            type="submit"
            className="w-full h-14 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition-colors"
          >
            Enviar
          </Button>

          {/* Logo de Wompi */}
          <div className="flex justify-start w-20">
            <img
              src="uploads/Home-Tu-San-Agustin-pago-wompi.webp"
              alt="Pago con Wompi"
              loading="lazy"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
