import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Bell, User, Globe, Shield } from 'lucide-react';

export default function SettingsSection() {
  const settingsSections = [
    {
      title: 'Perfil',
      description: 'Gestiona tu información personal y credenciales',
      icon: User,
    },
    {
      title: 'Notificaciones',
      description: 'Configura cómo y cuándo recibir notificaciones',
      icon: Bell,
    },
    {
      title: 'Sitio Web',
      description: 'Configuración general del sitio y apariencia',
      icon: Globe,
    },
    {
      title: 'Seguridad',
      description: 'Gestiona permisos y seguridad del sistema',
      icon: Shield,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Ajusta las preferencias y configuraciones del sistema
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {section.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Configuración Avanzada</CardTitle>
          </div>
          <CardDescription>
            Opciones adicionales de configuración
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Settings className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground max-w-md">
              Las opciones de configuración detalladas estarán disponibles próximamente.
              Por ahora, puedes gestionar las configuraciones básicas desde cada sección.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
