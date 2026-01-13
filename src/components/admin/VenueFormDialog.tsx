import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  direccion_completa?: string;
  telefono?: string;
  email?: string;
  sitio_web?: string;
  clima?: string;
  suite_nupcial?: boolean;
  zona_parqueo?: boolean;
  camerino?: boolean;
  conexion_120v?: boolean;
  conexion_220v?: boolean;
  url_video_youtube?: string;
}

interface VenueFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  venue: Venue | null;
  onSave: () => void;
}

const TIPO_LUGAR_OPTIONS = [
  'Restaurante',
  'Hotel',
  'Salón',
  'Finca',
  'Hacienda',
  'Centro de Eventos',
  'Jardín',
  'Terraza',
  'Casa',
  'Otro'
];

const CLIMA_OPTIONS = [
  'Interior',
  'Exterior',
  'Mixto',
  'Templado',
  'Cálido',
  'Frío'
];

const MONEDA_OPTIONS = ['COP', 'USD', 'EUR'];

export default function VenueFormDialog({
  open,
  onOpenChange,
  venue,
  onSave,
}: VenueFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Venue>>({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    capacidad_minima: 0,
    capacidad_maxima: 0,
    tipo_lugar: 'Salón',
    is_active: true,
    is_destacado: false,
    moneda: 'COP',
    clima: 'Mixto',
    suite_nupcial: false,
    zona_parqueo: false,
    camerino: false,
    conexion_120v: false,
    conexion_220v: false,
  });

  const [loading, setLoading] = useState(false);
  const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    if (venue) {
      setFormData(venue);
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        ubicacion: '',
        capacidad_minima: 0,
        capacidad_maxima: 0,
        tipo_lugar: 'Salón',
        is_active: true,
        is_destacado: false,
        moneda: 'COP',
        clima: 'Mixto',
        suite_nupcial: false,
        zona_parqueo: false,
        camerino: false,
        conexion_120v: false,
        conexion_220v: false,
      });
    }
  }, [venue, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = venue
        ? `${API_BASE_URL}/venues/${venue.id}`
        : `${API_BASE_URL}/venues/`;

      const method = venue ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: authService.getAuthHeaders(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave();
      } else if (response.status === 401) {
        alert('Sesión expirada. Por favor inicia sesión nuevamente.');
        window.location.reload();
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail || 'Error al guardar el lugar'}`);
      }
    } catch (error) {
      console.error('Error saving venue:', error);
      alert('Error al guardar el lugar');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {venue ? 'Editar Lugar' : 'Agregar Nuevo Lugar'}
          </DialogTitle>
          <DialogDescription>
            {venue
              ? 'Modifica la información del lugar'
              : 'Completa los datos del nuevo lugar'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Básica */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información Básica</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="nombre">Nombre *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  required
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="descripcion">Descripción *</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleChange('descripcion', e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="tipo_lugar">Tipo de Lugar *</Label>
                <Select
                  value={formData.tipo_lugar}
                  onValueChange={(value) => handleChange('tipo_lugar', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPO_LUGAR_OPTIONS.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="clima">Clima</Label>
                <Select
                  value={formData.clima || 'Mixto'}
                  onValueChange={(value) => handleChange('clima', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CLIMA_OPTIONS.map((clima) => (
                      <SelectItem key={clima} value={clima}>
                        {clima}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ubicación</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ubicacion">Ubicación *</Label>
                <Input
                  id="ubicacion"
                  value={formData.ubicacion}
                  onChange={(e) => handleChange('ubicacion', e.target.value)}
                  placeholder="Ciudad, Departamento"
                  required
                />
              </div>

              <div>
                <Label htmlFor="direccion_completa">Dirección Completa</Label>
                <Input
                  id="direccion_completa"
                  value={formData.direccion_completa || ''}
                  onChange={(e) =>
                    handleChange('direccion_completa', e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Capacidad y Precio */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Capacidad y Precio</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacidad_minima">Capacidad Mínima *</Label>
                <Input
                  id="capacidad_minima"
                  type="number"
                  value={formData.capacidad_minima}
                  onChange={(e) =>
                    handleChange('capacidad_minima', parseInt(e.target.value))
                  }
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="capacidad_maxima">Capacidad Máxima *</Label>
                <Input
                  id="capacidad_maxima"
                  type="number"
                  value={formData.capacidad_maxima}
                  onChange={(e) =>
                    handleChange('capacidad_maxima', parseInt(e.target.value))
                  }
                  min="0"
                  required
                />
              </div>

              <div>
                <Label htmlFor="precio_desde">Precio Desde</Label>
                <Input
                  id="precio_desde"
                  type="number"
                  value={formData.precio_desde || ''}
                  onChange={(e) =>
                    handleChange('precio_desde', parseFloat(e.target.value))
                  }
                  min="0"
                />
              </div>

              <div>
                <Label htmlFor="moneda">Moneda</Label>
                <Select
                  value={formData.moneda || 'COP'}
                  onValueChange={(value) => handleChange('moneda', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONEDA_OPTIONS.map((moneda) => (
                      <SelectItem key={moneda} value={moneda}>
                        {moneda}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Información de Contacto</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  value={formData.telefono || ''}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="sitio_web">Sitio Web</Label>
                <Input
                  id="sitio_web"
                  type="url"
                  value={formData.sitio_web || ''}
                  onChange={(e) => handleChange('sitio_web', e.target.value)}
                  placeholder="https://"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="url_video_youtube">Video YouTube</Label>
                <Input
                  id="url_video_youtube"
                  type="url"
                  value={formData.url_video_youtube || ''}
                  onChange={(e) =>
                    handleChange('url_video_youtube', e.target.value)
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Características</h3>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.suite_nupcial || false}
                  onChange={(e) =>
                    handleChange('suite_nupcial', e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">Suite Nupcial</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.zona_parqueo || false}
                  onChange={(e) =>
                    handleChange('zona_parqueo', e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">Zona de Parqueo</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.camerino || false}
                  onChange={(e) => handleChange('camerino', e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm">Camerino</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.conexion_120v || false}
                  onChange={(e) =>
                    handleChange('conexion_120v', e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">Conexión 120V</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.conexion_220v || false}
                  onChange={(e) =>
                    handleChange('conexion_220v', e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm">Conexión 220V</span>
              </label>
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Estado</h3>

            <div className="flex gap-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => handleChange('is_active', e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium">Activo</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_destacado}
                  onChange={(e) =>
                    handleChange('is_destacado', e.target.checked)
                  }
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium">Destacado</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Guardando...' : venue ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
