import { useState, useEffect } from 'react';
import { Plus, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VenuesTable from './VenuesTable';
import VenueFormDialog from './VenueFormDialog';
import LoginForm from './LoginForm';
import { authService } from '@/lib/auth';

interface Venue {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  capacidad_minima: number;
  capacidad_maxima: number;
  tipo_lugar: string;
  is_active: boolean;
  is_destacado: boolean;
  precio_desde?: number;
  moneda?: string;
}

export default function VenuesDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);

  const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/venues/`);
      const data = await response.json();
      setVenues(data);
      setFilteredVenues(data);
    } catch (error) {
      console.error('Error fetching venues:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    const filtered = venues.filter(venue =>
      venue.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.tipo_lugar.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVenues(filtered);
  }, [searchTerm, venues]);

  const handleAddVenue = () => {
    setEditingVenue(null);
    setIsDialogOpen(true);
  };

  const handleEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
    setIsDialogOpen(true);
  };

  const handleDeleteVenue = async (venueId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este lugar?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/venues/${venueId}`, {
        method: 'DELETE',
        headers: authService.getAuthHeaders(),
      });

      if (response.ok) {
        fetchVenues();
      } else if (response.status === 401) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      } else {
        alert('Error al eliminar el lugar');
      }
    } catch (error) {
      console.error('Error deleting venue:', error);
      alert('Error al eliminar el lugar');
    }
  };

  const handleSaveVenue = () => {
    fetchVenues();
    setIsDialogOpen(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchVenues();
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setVenues([]);
    setFilteredVenues([]);
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Dashboard de Lugares
          </h1>
          <p className="text-muted-foreground">
            Gestiona todos los lugares disponibles para eventos
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nombre, ubicación o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleAddVenue} className="gap-2">
          <Plus className="h-4 w-4" />
          Agregar Lugar
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-muted-foreground">Cargando lugares...</div>
        </div>
      ) : (
        <VenuesTable
          venues={filteredVenues}
          onEdit={handleEditVenue}
          onDelete={handleDeleteVenue}
        />
      )}

      <VenueFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        venue={editingVenue}
        onSave={handleSaveVenue}
      />
    </div>
  );
}
