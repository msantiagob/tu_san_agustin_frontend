import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Calendar, Users, TrendingUp } from 'lucide-react';

interface VenueStats {
  total: number;
  active: number;
  inactive: number;
  highlighted: number;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<VenueStats>({
    total: 0,
    active: 0,
    inactive: 0,
    highlighted: 0,
  });
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/venues/?only_active=false`);
        const data = await response.json();

        const stats = {
          total: data.length,
          active: data.filter((v: any) => v.is_active).length,
          inactive: data.filter((v: any) => !v.is_active).length,
          highlighted: data.filter((v: any) => v.is_destacado).length,
        };

        setStats(stats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total de Lugares',
      value: stats.total,
      description: 'Lugares registrados',
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      title: 'Lugares Activos',
      value: stats.active,
      description: 'Visibles en el sitio',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Lugares Destacados',
      value: stats.highlighted,
      description: 'Mostrados primero',
      icon: Calendar,
      color: 'text-purple-600',
    },
    {
      title: 'Lugares Inactivos',
      value: stats.inactive,
      description: 'No visibles',
      icon: Users,
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Resumen del Dashboard</h2>
        <p className="text-muted-foreground">
          Vista general de las estadísticas de tu sitio
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? '...' : stat.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Bienvenido al Dashboard</CardTitle>
            <CardDescription>
              Gestiona todos los aspectos de Tu San Agustín desde aquí
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Accesos Rápidos</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Gestiona los lugares disponibles para eventos</li>
                  <li>Visualiza y edita la información de cada lugar</li>
                  <li>Controla qué lugares son visibles en el sitio</li>
                  <li>Destaca lugares importantes en la página principal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No hay actividad reciente que mostrar
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
