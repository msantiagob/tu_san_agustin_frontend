"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = ["Inicio", "Eventos", "Servicios", "Lugares", "Historias", "Blog", "Nosotros"];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll cuando el menú móvil esté abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : prev;
    return () => { document.body.style.overflow = prev; };
  }, [isMenuOpen]);

  // Enfocar el primer elemento del panel al abrir
  useEffect(() => {
    if (!isMenuOpen) return;
    const first = panelRef.current?.querySelector<HTMLElement>("a,button");
    first?.focus();
  }, [isMenuOpen]);

  const close = () => setIsMenuOpen(false);
  const onKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Escape") close(); };

  return (
    <>
      <nav className="bg-white shadow-sm py-8 px-4 relative z-30" aria-label="Navegación principal">
        <div className="max-w-7xl mx-auto">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8" id="navbar">
            {navItems.map((item) => (
              <a key={item} href="#" className="hover:text-gray-900 transition-colors">
                {item}
              </a>
            ))}
            <a
              className="nav-link btn-contacto"
              href="https://api.whatsapp.com/send/?phone=573168753305&amp;text=Hola%21&amp;type=phone_number&amp;app_absent=0"
            >
              Contacto
            </a>
          </div>

          {/* Mobile trigger */}
          <div className="md:hidden flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Abrir menú"
            >
              <Menu aria-hidden="true" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (overlay + panel) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={close}
          onKeyDown={onKeyDown}
          role="presentation"
        >
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-4 outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" onClick={close} className="mb-4" aria-label="Cerrar menú">
              <X aria-hidden="true" />
            </Button>

            <nav className="flex flex-col gap-4" aria-label="Menú móvil">
              {navItems.map((item) => (
                <a key={item} href="#" className="hover:text-gray-900 transition-colors">
                  {item}
                </a>
              ))}
              <Button asChild className="mt-4">
                <a href="https://api.whatsapp.com/send/?phone=573168753305&amp;text=Hola%21&amp;type=phone_number&amp;app_absent=0">
                  Contacto
                </a>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
