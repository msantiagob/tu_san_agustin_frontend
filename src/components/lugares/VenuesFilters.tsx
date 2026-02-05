import { useState, useEffect } from 'react';
import { X, Filter, ChevronDown } from 'lucide-react';

interface Servicio {
  id: number;
  nombre: string;
  icono: string;
}

interface Capacidad {
  label: string;
  min: number;
  max: number | null;
}

interface FilterOptions {
  ubicaciones: string[];
  tipos_lugar: string[];
  servicios: Servicio[];
  capacidades: Capacidad[];
}

interface Filters {
  ubicacion: string;
  tipo_lugar: string;
  capacidad_minima: number | null;
  capacidad_maxima: number | null;
  servicio_id: number | null;
}

interface Props {
  onFiltersChange: (filters: Filters) => void;
  activeFiltersCount: number;
}

const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export default function VenuesFilters({ onFiltersChange, activeFiltersCount }: Props) {
  const [options, setOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    ubicacion: '',
    tipo_lugar: '',
    capacidad_minima: null,
    capacidad_maxima: null,
    servicio_id: null,
  });

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await fetch(`${API_URL}/venues/filters/options`);
      if (response.ok) {
        const data = await response.json();
        setOptions(data);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof Filters, value: string | number | null) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleCapacidadChange = (capacidad: Capacidad | null) => {
    const newFilters = {
      ...filters,
      capacidad_minima: capacidad?.min || null,
      capacidad_maxima: capacidad?.max || null,
    };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters: Filters = {
      ubicacion: '',
      tipo_lugar: '',
      capacidad_minima: null,
      capacidad_maxima: null,
      servicio_id: null,
    };
    setFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  const getActiveCapacidad = () => {
    if (!options || !filters.capacidad_minima) return null;
    return options.capacidades.find(
      (c) => c.min === filters.capacidad_minima && c.max === filters.capacidad_maxima
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center gap-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-10 w-32 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!options) return null;

  return (
    <div className="space-y-4">
      {/* Desktop filters */}
      <div className="hidden md:flex flex-wrap justify-center gap-4">
        {/* Capacidad */}
        <div className="relative">
          <select
            value={getActiveCapacidad()?.label || ''}
            onChange={(e) => {
              const selected = options.capacidades.find((c) => c.label === e.target.value);
              handleCapacidadChange(selected || null);
            }}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent cursor-pointer"
          >
            <option value="">Cantidad de Personas</option>
            {options.capacidades.map((cap) => (
              <option key={cap.label} value={cap.label}>
                {cap.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Ubicación */}
        <div className="relative">
          <select
            value={filters.ubicacion}
            onChange={(e) => handleFilterChange('ubicacion', e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent cursor-pointer"
          >
            <option value="">Ciudad</option>
            {options.ubicaciones.map((ubi) => (
              <option key={ubi} value={ubi}>
                {ubi}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Tipo de Evento (Servicio) */}
        <div className="relative">
          <select
            value={filters.servicio_id || ''}
            onChange={(e) => handleFilterChange('servicio_id', e.target.value ? parseInt(e.target.value) : null)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent cursor-pointer"
          >
            <option value="">Tipo de Evento</option>
            {options.servicios.map((serv) => (
              <option key={serv.id} value={serv.id}>
                {serv.icono} {serv.nombre}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Tipo de Lugar */}
        <div className="relative">
          <select
            value={filters.tipo_lugar}
            onChange={(e) => handleFilterChange('tipo_lugar', e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent cursor-pointer"
          >
            <option value="">Tipo de Lugar</option>
            {options.tipos_lugar.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={applyFilters}
          className="bg-teal text-white px-6 py-2 rounded-lg hover:bg-teal/90 transition-colors font-medium flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtrar
          {activeFiltersCount > 0 && (
            <span className="bg-white text-teal text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Borrar
          </button>
        )}
      </div>

      {/* Mobile filters button */}
      <div className="md:hidden flex justify-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700"
        >
          <Filter className="w-4 h-4" />
          Filtros
          {activeFiltersCount > 0 && (
            <span className="bg-teal text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile filters modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-charcoal">Filtros</h3>
              <button onClick={() => setIsOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Capacidad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad de Personas
                </label>
                <select
                  value={getActiveCapacidad()?.label || ''}
                  onChange={(e) => {
                    const selected = options.capacidades.find((c) => c.label === e.target.value);
                    handleCapacidadChange(selected || null);
                  }}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
                >
                  <option value="">Todas</option>
                  {options.capacidades.map((cap) => (
                    <option key={cap.label} value={cap.label}>
                      {cap.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ubicación */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad
                </label>
                <select
                  value={filters.ubicacion}
                  onChange={(e) => handleFilterChange('ubicacion', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
                >
                  <option value="">Todas</option>
                  {options.ubicaciones.map((ubi) => (
                    <option key={ubi} value={ubi}>
                      {ubi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Evento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Evento
                </label>
                <select
                  value={filters.servicio_id || ''}
                  onChange={(e) => handleFilterChange('servicio_id', e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
                >
                  <option value="">Todos</option>
                  {options.servicios.map((serv) => (
                    <option key={serv.id} value={serv.id}>
                      {serv.icono} {serv.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de Lugar */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Lugar
                </label>
                <select
                  value={filters.tipo_lugar}
                  onChange={(e) => handleFilterChange('tipo_lugar', e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
                >
                  <option value="">Todos</option>
                  {options.tipos_lugar.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={applyFilters}
                className="flex-1 bg-teal text-white py-3 rounded-lg font-medium"
              >
                Aplicar Filtros
              </button>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium"
                >
                  Borrar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
