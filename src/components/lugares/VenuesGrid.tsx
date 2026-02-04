import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface VenueImage {
  id: number;
  url: string;
  titulo: string;
  es_portada: boolean;
  orden: number;
}

interface Venue {
  id: number;
  nombre: string;
  descripcion: string;
  capacidad_minima: number;
  capacidad_maxima: number;
  ubicacion: string;
  tipo_lugar: string;
  precio_desde: number;
  moneda: string;
  is_active: boolean;
  is_destacado: boolean;
  imagen_portada: VenueImage | null;
  galeria: VenueImage[];
}

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const ITEMS_PER_PAGE = 6;

export default function VenuesGrid() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVenues, setTotalVenues] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false);

  // Cargar venues cuando cambia la página
  useEffect(() => {
    fetchVenues(currentPage);
  }, [currentPage]);

  const fetchVenues = async (page: number) => {
    try {
      // Solo mostrar loading completo en la primera carga
      if (page === 1 && venues.length === 0) {
        setLoading(true);
      } else {
        setIsChangingPage(true);
      }

      const skip = (page - 1) * ITEMS_PER_PAGE;

      // Primero obtener el total (solo una vez o cuando sea necesario)
      if (totalVenues === 0) {
        const countResponse = await fetch(`${API_URL}/venues/count`);
        if (countResponse.ok) {
          const countData = await countResponse.json();
          setTotalVenues(countData.total);
        } else {
          // Si no hay endpoint de count, obtener todos los IDs para contar
          const allResponse = await fetch(`${API_URL}/venues/?limit=1000`);
          if (allResponse.ok) {
            const allData = await allResponse.json();
            setTotalVenues(allData.length);
          }
        }
      }

      // Obtener solo los venues de esta página
      const response = await fetch(`${API_URL}/venues/?skip=${skip}&limit=${ITEMS_PER_PAGE}`);

      if (!response.ok) {
        throw new Error('Error al cargar los lugares');
      }

      const data = await response.json();
      setVenues(data);

      // Actualizar total si es la primera carga
      if (totalVenues === 0 && data.length < ITEMS_PER_PAGE) {
        setTotalVenues(skip + data.length);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
      setIsChangingPage(false);
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

  // Pagination logic
  const totalPages = Math.ceil(totalVenues / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const goToPage = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-16 md:pb-32">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="flex flex-col justify-center gap-4 md:gap-5 m-4 md:m-10 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-[32px]"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchVenues(currentPage)}
          className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal/90 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (venues.length === 0 && !isChangingPage) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500">No hay lugares disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-32 relative">
      {/* Loading overlay cuando se cambia de página */}
      {isChangingPage && (
        <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
          <div className="flex items-center gap-3 text-teal">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-medium">Cargando...</span>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <p className="text-gray-600">
          Mostrando {startIndex + 1}-{Math.min(startIndex + venues.length, totalVenues)} de {totalVenues} lugares
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <article key={venue.id} className="flex flex-col justify-center gap-4 md:gap-5 m-4 md:m-10 group">
            <h4 className="text-charcoal font-poppins font-bold text-center text-lg md:text-xl">
              {venue.nombre}
            </h4>

            <a href={`/lugares/${venue.id}`} className="relative block">
              {venue.imagen_portada ? (
                <img
                  src={venue.imagen_portada.url}
                  alt={venue.nombre}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover rounded-[32px] shadow-md pointer-events-none select-none group-hover:shadow-xl transition-shadow"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-gray-200 rounded-[32px] shadow-md flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen</span>
                </div>
              )}

              {venue.is_destacado && (
                <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Destacado
                </span>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[32px] flex items-center justify-center">
                <span className="text-white font-medium text-lg">Ver detalles</span>
              </div>
            </a>

            <div className="text-center text-sm text-gray-600 space-y-1">
              <p>{venue.ubicacion}</p>
              <p>{venue.capacidad_minima} - {venue.capacidad_maxima} personas</p>
              {venue.precio_desde > 0 && (
                <p className="font-semibold text-teal">
                  Desde {formatPrice(venue.precio_desde, venue.moneda)}
                </p>
              )}
            </div>

            <div className="mx-auto">
              <a
                href={`/lugares/${venue.id}`}
                className="inline-block bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal/90 transition-colors font-medium"
              >
                Ver más
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 mt-12">
          <div className="flex justify-center items-center gap-2">
            {/* Previous button */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1 || isChangingPage}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1 || isChangingPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Anterior
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                  <button
                    key={index}
                    onClick={() => goToPage(page)}
                    disabled={isChangingPage}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-teal text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    } ${isChangingPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {page}
                  </button>
                ) : (
                  <span key={index} className="px-2 text-gray-500">
                    {page}
                  </span>
                )
              ))}
            </div>

            {/* Next button */}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || isChangingPage}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === totalPages || isChangingPage
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
