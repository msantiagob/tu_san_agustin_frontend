import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import VenuesFilters from './VenuesFilters';

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

interface Filters {
  ubicacion: string;
  tipo_lugar: string;
  capacidad_minima: number | null;
  capacidad_maxima: number | null;
  servicio_id: number | null;
}

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';
const ITEMS_PER_PAGE = 6;

export default function VenuesSection() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVenues, setTotalVenues] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    ubicacion: '',
    tipo_lugar: '',
    capacidad_minima: null,
    capacidad_maxima: null,
    servicio_id: null,
  });

  const buildQueryString = useCallback((page: number, includeSkipLimit = true) => {
    const params = new URLSearchParams();

    if (includeSkipLimit) {
      params.append('skip', String((page - 1) * ITEMS_PER_PAGE));
      params.append('limit', String(ITEMS_PER_PAGE));
    }

    if (filters.ubicacion) params.append('ubicacion', filters.ubicacion);
    if (filters.tipo_lugar) params.append('tipo_lugar', filters.tipo_lugar);
    if (filters.capacidad_minima) params.append('capacidad_minima', String(filters.capacidad_minima));
    if (filters.capacidad_maxima) params.append('capacidad_maxima', String(filters.capacidad_maxima));
    if (filters.servicio_id) params.append('servicio_id', String(filters.servicio_id));

    return params.toString();
  }, [filters]);

  const fetchVenues = useCallback(async (page: number, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      } else {
        setIsChangingPage(true);
      }

      // Fetch count first
      const countResponse = await fetch(`${API_URL}/venues/count?${buildQueryString(page, false)}`);
      if (countResponse.ok) {
        const countData = await countResponse.json();
        setTotalVenues(countData.total);
      }

      // Fetch venues
      const response = await fetch(`${API_URL}/venues/?${buildQueryString(page)}`);

      if (!response.ok) {
        throw new Error('Error al cargar los lugares');
      }

      const data = await response.json();
      setVenues(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
      setIsChangingPage(false);
    }
  }, [buildQueryString]);

  // Initial load
  useEffect(() => {
    fetchVenues(1, true);
  }, []);

  // Refetch when page changes
  useEffect(() => {
    if (!loading) {
      fetchVenues(currentPage);
    }
  }, [currentPage]);

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    // Trigger refetch with new filters
    setTimeout(() => {
      fetchVenuesWithFilters(newFilters);
    }, 0);
  };

  const fetchVenuesWithFilters = async (newFilters: Filters) => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      params.append('skip', '0');
      params.append('limit', String(ITEMS_PER_PAGE));

      if (newFilters.ubicacion) params.append('ubicacion', newFilters.ubicacion);
      if (newFilters.tipo_lugar) params.append('tipo_lugar', newFilters.tipo_lugar);
      if (newFilters.capacidad_minima) params.append('capacidad_minima', String(newFilters.capacidad_minima));
      if (newFilters.capacidad_maxima) params.append('capacidad_maxima', String(newFilters.capacidad_maxima));
      if (newFilters.servicio_id) params.append('servicio_id', String(newFilters.servicio_id));

      // Fetch count
      const countParams = new URLSearchParams(params);
      countParams.delete('skip');
      countParams.delete('limit');
      const countResponse = await fetch(`${API_URL}/venues/count?${countParams.toString()}`);
      if (countResponse.ok) {
        const countData = await countResponse.json();
        setTotalVenues(countData.total);
      }

      // Fetch venues
      const response = await fetch(`${API_URL}/venues/?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Error al cargar los lugares');
      }

      const data = await response.json();
      setVenues(data);
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

  const totalPages = Math.ceil(totalVenues / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const goToPage = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const activeFiltersCount = [
    filters.ubicacion,
    filters.tipo_lugar,
    filters.capacidad_minima,
    filters.servicio_id,
  ].filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Filters */}
      <VenuesFilters
        onFiltersChange={handleFiltersChange}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Loading state */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-16">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex flex-col justify-center gap-4 md:gap-5 m-4 md:m-10 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-[32px]"></div>
              <div className="h-10 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => fetchVenues(currentPage, true)}
            className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal/90 transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && venues.length === 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 text-lg mb-4">No se encontraron lugares con los filtros seleccionados.</p>
          {activeFiltersCount > 0 && (
            <button
              onClick={() => handleFiltersChange({
                ubicacion: '',
                tipo_lugar: '',
                capacidad_minima: null,
                capacidad_maxima: null,
                servicio_id: null,
              })}
              className="text-teal hover:underline"
            >
              Borrar filtros
            </button>
          )}
        </div>
      )}

      {/* Venues grid */}
      {!loading && !error && venues.length > 0 && (
        <div className="pb-16 md:pb-32 relative">
          {/* Loading overlay when changing page */}
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
                      <span key={index} className="px-2 text-gray-500">{page}</span>
                    )
                  ))}
                </div>

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
      )}
    </div>
  );
}
