import { Edit, Trash2, MapPin, Users, DollarSign, Image, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
}

interface VenuesTableProps {
  venues: Venue[];
  onEdit: (venue: Venue) => void;
  onDelete: (venueId: number) => void;
  onToggleActive: (venueId: number, currentStatus: boolean) => void;
}

export default function VenuesTable({ venues, onEdit, onDelete, onToggleActive }: VenuesTableProps) {
  if (venues.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border">
        <p className="text-muted-foreground">
          No se encontraron lugares. Agrega uno para empezar.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Capacidad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues.map((venue) => (
            <TableRow key={venue.id}>
              <TableCell>
                {venue.imagen_portada ? (
                  <img
                    src={venue.imagen_portada.url}
                    alt={venue.imagen_portada.titulo || venue.nombre}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                    <Image className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{venue.nombre}</span>
                  {venue.is_destacado && (
                    <span className="text-xs text-yellow-600 font-semibold">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  {venue.ubicacion}
                </div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  {venue.tipo_lugar}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 text-sm">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  {venue.capacidad_minima} - {venue.capacidad_maxima}
                </div>
              </TableCell>
              <TableCell>
                {venue.precio_desde ? (
                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    {venue.moneda} {venue.precio_desde.toLocaleString()}
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    venue.is_active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {venue.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onToggleActive(venue.id, venue.is_active)}
                    className={`h-8 w-8 p-0 ${
                      venue.is_active
                        ? 'text-green-600 hover:text-green-700'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title={venue.is_active ? 'Desactivar' : 'Activar'}
                  >
                    <Power className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(venue)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(venue.id)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
