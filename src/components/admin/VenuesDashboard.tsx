import { useState, useEffect } from 'react';
import { Plus, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VenuesTable from './VenuesTable';
import VenueFormDialog from './VenueFormDialog';
import LoginForm from './LoginForm';
import { authService } from '@/lib/auth';

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
  ubicacion: string;
  capacidad_minima: number;
  capacidad_maxima: number;
  tipo_lugar: string;
  is_active: boolean;
  is_destacado: boolean;
  precio_desde?: number;
  moneda?: string;
  imagen_portada?: VenueImage;
  imagenes?: VenueImage[];
  galeria?: VenueImage[];
}

interface VenuesDashboardProps {
  hideHeader?: boolean;
}

export default function VenuesDashboard({ hideHeader = false }: VenuesDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);

  const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        setIsAuthenticated(true);
        const user = await authService.getCurrentUser();
        setCurrentUser(user);
      }
    };
    checkAuth();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/venues/?only_active=false`);
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

  const handleToggleActive = async (venueId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/venues/${venueId}`, {
        method: 'PUT',
        headers: {
          ...authService.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_active: !currentStatus,
        }),
      });

      if (response.ok) {
        fetchVenues();
      } else if (response.status === 401) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        handleLogout();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(`Error al cambiar el estado del lugar: ${errorData.detail || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error toggling venue status:', error);
      alert('Error al cambiar el estado del lugar: ' + error);
    }
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
    <div className={hideHeader ? "" : "container mx-auto py-8 px-4"}>
      {!hideHeader && (
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Dashboard de Lugares
            </h1>
            <p className="text-muted-foreground">
              Gestiona todos los lugares disponibles para eventos
            </p>
            {currentUser && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {currentUser.username}
                </span>
                {currentUser.roles && currentUser.roles.length > 0 && (
                  <div className="flex gap-1">
                    {currentUser.roles.map((role: any) => (
                      <span
                        key={role.id}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {role.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      )}

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
          onToggleActive={handleToggleActive}
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
