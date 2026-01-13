import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EventsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Eventos</h2>
          <p className="text-muted-foreground">
            Gestiona los eventos y reservas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Evento
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Gestión de Eventos</CardTitle>
          </div>
          <CardDescription>
            Próximamente: Sistema de gestión de eventos y reservas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Esta sección permitirá gestionar eventos, reservas y disponibilidad
              de los lugares. Podrás ver el calendario completo, gestionar solicitudes
              y coordinar con los clientes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
