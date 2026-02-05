/* empty css                                   */
import { c as createAstro, a as createComponent, f as renderComponent, e as renderTemplate, m as maybeRenderHead } from '../../_astro/astro/server.0skas1ni.js';
import 'piccolore';
import { $ as $$Layout } from '../../_astro/Layout.DIK-rTR4.js';
import { $ as $$Navbar } from '../../_astro/Navbar.DNXi5lcI.js';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Users, ChevronRight, Check, X, Phone, Mail, Globe } from 'lucide-react';
import { $ as $$JoinUsFooter, f as footerBg } from '../../_astro/footer-bg.D9BWl95A.js';
export { renderers } from '../../renderers.mjs';

const API_URL = "http://localhost:8000/api/v1";
function VenueDetail({ venueId }) {
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    fetchVenue();
  }, [venueId]);
  const fetchVenue = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/venues/${venueId}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Lugar no encontrado");
        }
        throw new Error("Error al cargar el lugar");
      }
      const data = await response.json();
      setVenue(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: currency || "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  const allImages = venue ? [
    ...venue.imagen_portada ? [venue.imagen_portada] : [],
    ...venue.galeria
  ] : [];
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  const getYouTubeEmbedUrl = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-200 rounded w-1/3 mb-4" }),
      /* @__PURE__ */ jsx("div", { className: "h-96 bg-gray-200 rounded-2xl mb-8" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-full" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-5/6" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-gray-200 rounded w-4/6" })
      ] }) })
    ] }) });
  }
  if (error || !venue) {
    return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-800 mb-4", children: error || "Lugar no encontrado" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/lugares-bodas-eventos",
          className: "inline-block bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors",
          children: "Volver a lugares"
        }
      )
    ] });
  }
  const features = [
    { label: "Suite Nupcial", value: venue.suite_nupcial },
    { label: "Zona de Parqueo", value: venue.zona_parqueo },
    { label: "Camerino", value: venue.camerino },
    { label: "Conexión 120V", value: venue.conexion_120v },
    { label: "Conexión 220V", value: venue.conexion_220v }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-4 py-8 md:py-12", children: [
    /* @__PURE__ */ jsx("nav", { className: "mb-6", children: /* @__PURE__ */ jsxs("a", { href: "/lugares-bodas-eventos", className: "text-teal hover:underline flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" }),
      "Volver a lugares"
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-2", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl md:text-4xl font-bold text-charcoal", children: venue.nombre }),
        venue.is_destacado && /* @__PURE__ */ jsx("span", { className: "bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full", children: "Destacado" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-gray-600", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
          venue.ubicacion
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Users, { className: "w-4 h-4" }),
          venue.capacidad_minima,
          " - ",
          venue.capacidad_maxima,
          " personas"
        ] }),
        venue.tipo_lugar && /* @__PURE__ */ jsx("span", { className: "bg-gray-100 px-3 py-1 rounded-full text-sm", children: venue.tipo_lugar })
      ] })
    ] }),
    allImages.length > 0 && /* @__PURE__ */ jsxs("div", { className: "relative mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: allImages[currentImageIndex]?.url,
          alt: allImages[currentImageIndex]?.titulo || venue.nombre,
          className: "w-full h-full object-cover"
        }
      ) }),
      allImages.length > 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prevImage,
            className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: nextImage,
            className: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", children: allImages.map((_, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setCurrentImageIndex(idx),
            className: `w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`
          },
          idx
        )) })
      ] }),
      allImages.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex gap-2 mt-4 overflow-x-auto pb-2", children: allImages.map((img, idx) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setCurrentImageIndex(idx),
          className: `flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${idx === currentImageIndex ? "border-teal" : "border-transparent"}`,
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: img.url,
              alt: img.titulo,
              className: "w-full h-full object-cover"
            }
          )
        },
        img.id
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-charcoal mb-4", children: "Descripción" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 leading-relaxed whitespace-pre-line", children: venue.descripcion || "Sin descripción disponible." })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-charcoal mb-4", children: "Características" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
            features.map((feature) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `flex items-center gap-2 p-3 rounded-lg ${feature.value ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-400"}`,
                children: [
                  feature.value ? /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: feature.label })
                ]
              },
              feature.label
            )),
            venue.clima && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-blue-50 text-blue-700", children: /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium", children: [
              "Clima: ",
              venue.clima
            ] }) })
          ] })
        ] }),
        venue.servicios && venue.servicios.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-charcoal mb-4", children: "Servicios" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: venue.servicios.map((servicio) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium",
              children: [
                servicio.icono,
                " ",
                servicio.nombre
              ]
            },
            servicio.id
          )) })
        ] }),
        venue.espacios && venue.espacios.length > 0 && /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-charcoal mb-4", children: "Espacios" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: venue.espacios.map((espacio) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium",
              children: [
                espacio.icono,
                " ",
                espacio.nombre
              ]
            },
            espacio.id
          )) })
        ] }),
        venue.url_video_youtube && /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-charcoal mb-4", children: "Video" }),
          /* @__PURE__ */ jsx("div", { className: "aspect-video rounded-xl overflow-hidden", children: /* @__PURE__ */ jsx(
            "iframe",
            {
              src: getYouTubeEmbedUrl(venue.url_video_youtube) || "",
              title: `Video de ${venue.nombre}`,
              allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
              allowFullScreen: true,
              className: "w-full h-full"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6", children: [
        venue.precio_desde > 0 && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "Precio desde" }),
          /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-teal", children: formatPrice(venue.precio_desde, venue.moneda) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-charcoal", children: "Contacto" }),
          venue.telefono && /* @__PURE__ */ jsxs(
            "a",
            {
              href: `tel:${venue.telefono}`,
              className: "flex items-center gap-3 text-gray-600 hover:text-teal transition-colors",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { children: venue.telefono })
              ]
            }
          ),
          venue.email && /* @__PURE__ */ jsxs(
            "a",
            {
              href: `mailto:${venue.email}`,
              className: "flex items-center gap-3 text-gray-600 hover:text-teal transition-colors",
              children: [
                /* @__PURE__ */ jsx(Mail, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { className: "break-all", children: venue.email })
              ]
            }
          ),
          venue.sitio_web && /* @__PURE__ */ jsxs(
            "a",
            {
              href: venue.sitio_web,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-3 text-gray-600 hover:text-teal transition-colors",
              children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-5 h-5" }),
                /* @__PURE__ */ jsx("span", { children: "Visitar sitio web" })
              ]
            }
          )
        ] }),
        venue.direccion_completa && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-charcoal", children: "Dirección" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-sm", children: venue.direccion_completa })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `https://wa.me/573045551234?text=Hola, me interesa el lugar ${venue.nombre}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-medium transition-colors",
            children: "Contactar por WhatsApp"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: `mailto:${venue.email || "info@tusanagustin.com"}?subject=Consulta sobre ${venue.nombre}`,
            className: "block w-full bg-teal hover:bg-teal/90 text-white text-center py-3 rounded-lg font-medium transition-colors",
            children: "Solicitar Información"
          }
        )
      ] }) })
    ] })
  ] });
}

const $$Astro = createAstro("https://www.tusanagustin.com");
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const lang = "es";
  const seo = {
    title: "Detalle del Lugar",
    description: "Conoce todos los detalles de este lugar para bodas y eventos en Medell\xEDn y Antioquia.",
    keywords: "lugares bodas Medell\xEDn, fincas para bodas, haciendas eventos Antioquia"
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": seo.title, "description": seo.description, "keywords": seo.keywords, "lang": lang }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, { "lang": lang })} ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> ${renderComponent($$result2, "VenueDetail", VenueDetail, { "client:load": true, "venueId": id, "client:component-hydration": "load", "client:component-path": "/Users/sonmyd/projects/tu_san_agustin/tu_san_agustin_frontend/src/components/lugares/VenueDetail", "client:component-export": "default" })} </main> ${renderComponent($$result2, "JoinUsFooter", $$JoinUsFooter, { "backgroundImage": footerBg, "showBackground": true })} ` })}`;
}, "/Users/sonmyd/projects/tu_san_agustin/tu_san_agustin_frontend/src/pages/lugares/[id].astro", void 0);

const $$file = "/Users/sonmyd/projects/tu_san_agustin/tu_san_agustin_frontend/src/pages/lugares/[id].astro";
const $$url = "/lugares/[id].html";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
