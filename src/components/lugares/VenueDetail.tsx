import { useState, useEffect } from 'react';
import { MapPin, Users, Phone, Mail, Globe, Play, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface VenueImage {
  id: number;
  url: string;
  titulo: string;
  es_portada: boolean;
  orden: number;
}

interface Service {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
}

interface Space {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
}

interface Venue {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad_minima: number;
  capacidad_maxima: number;
  ubicacion: string;
  direccion_completa: string;
  latitud: string;
  longitud: string;
  tipo_lugar: string;
  clima: string;
  suite_nupcial: boolean;
  zona_parqueo: boolean;
  camerino: boolean;
  conexion_120v: boolean;
  conexion_220v: boolean;
  url_video_youtube: string;
  telefono: string;
  email: string;
  sitio_web: string;
  precio_desde: number;
  moneda: string;
  is_active: boolean;
  is_destacado: boolean;
  imagen_portada: VenueImage | null;
  galeria: VenueImage[];
  servicios: Service[];
  espacios: Space[];
}

interface Props {
  venueId: string;
}

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function VenueDetail({ venueId }: Props) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
          throw new Error('Lugar no encontrado');
        }
        throw new Error('Error al cargar el lugar');
      }

      const data = await response.json();
      setVenue(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency || 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const allImages = venue ? [
    ...(venue.imagen_portada ? [venue.imagen_portada] : []),
    ...venue.galeria
  ] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !venue) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          {error || 'Lugar no encontrado'}
        </h1>
        <a
          href="/lugares-bodas-eventos"
          className="inline-block bg-teal text-white px-6 py-3 rounded-lg hover:bg-teal/90 transition-colors"
        >
          Volver a lugares
        </a>
      </div>
    );
  }

  const features = [
    { label: 'Suite Nupcial', value: venue.suite_nupcial },
    { label: 'Zona de Parqueo', value: venue.zona_parqueo },
    { label: 'Camerino', value: venue.camerino },
    { label: 'Conexión 120V', value: venue.conexion_120v },
    { label: 'Conexión 220V', value: venue.conexion_220v },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <a href="/lugares-bodas-eventos" className="text-teal hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Volver a lugares
        </a>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-charcoal">{venue.nombre}</h1>
          {venue.is_destacado && (
            <span className="bg-amber-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              Destacado
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {venue.ubicacion}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {venue.capacidad_minima} - {venue.capacidad_maxima} personas
          </span>
          {venue.tipo_lugar && (
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {venue.tipo_lugar}
            </span>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {allImages.length > 0 && (
        <div className="relative mb-8">
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={allImages[currentImageIndex]?.url}
              alt={allImages[currentImageIndex]?.titulo || venue.nombre}
              className="w-full h-full object-cover"
            />
          </div>

          {allImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    idx === currentImageIndex ? 'border-teal' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.titulo}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">Descripción</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {venue.descripcion || 'Sin descripción disponible.'}
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl font-bold text-charcoal mb-4">Características</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    feature.value ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {feature.value ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <X className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
              {venue.clima && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 text-blue-700">
                  <span className="text-sm font-medium">Clima: {venue.clima}</span>
                </div>
              )}
            </div>
          </section>

          {/* Services */}
          {venue.servicios && venue.servicios.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-charcoal mb-4">Servicios</h2>
              <div className="flex flex-wrap gap-3">
                {venue.servicios.map((servicio) => (
                  <span
                    key={servicio.id}
                    className="bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {servicio.icono} {servicio.nombre}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Spaces */}
          {venue.espacios && venue.espacios.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-charcoal mb-4">Espacios</h2>
              <div className="flex flex-wrap gap-3">
                {venue.espacios.map((espacio) => (
                  <span
                    key={espacio.id}
                    className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {espacio.icono} {espacio.nombre}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Video */}
          {venue.url_video_youtube && (
            <section>
              <h2 className="text-xl font-bold text-charcoal mb-4">Video</h2>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(venue.url_video_youtube) || ''}
                  title={`Video de ${venue.nombre}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Price */}
            {venue.precio_desde > 0 && (
              <div>
                <p className="text-sm text-gray-500">Precio desde</p>
                <p className="text-3xl font-bold text-teal">
                  {formatPrice(venue.precio_desde, venue.moneda)}
                </p>
              </div>
            )}

            {/* Contact */}
            <div className="space-y-3">
              <h3 className="font-bold text-charcoal">Contacto</h3>

              {venue.telefono && (
                <a
                  href={`tel:${venue.telefono}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>{venue.telefono}</span>
                </a>
              )}

              {venue.email && (
                <a
                  href={`mailto:${venue.email}`}
                  className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="break-all">{venue.email}</span>
                </a>
              )}

              {venue.sitio_web && (
                <a
                  href={venue.sitio_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-600 hover:text-teal transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span>Visitar sitio web</span>
                </a>
              )}
            </div>

            {/* Address */}
            {venue.direccion_completa && (
              <div className="space-y-2">
                <h3 className="font-bold text-charcoal">Dirección</h3>
                <p className="text-gray-600 text-sm">{venue.direccion_completa}</p>
              </div>
            )}

            {/* CTA */}
            <a
              href={`https://wa.me/573045551234?text=Hola, me interesa el lugar ${venue.nombre}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-medium transition-colors"
            >
              Contactar por WhatsApp
            </a>

            <a
              href={`mailto:${venue.email || 'info@tusanagustin.com'}?subject=Consulta sobre ${venue.nombre}`}
              className="block w-full bg-teal hover:bg-teal/90 text-white text-center py-3 rounded-lg font-medium transition-colors"
            >
              Solicitar Información
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
