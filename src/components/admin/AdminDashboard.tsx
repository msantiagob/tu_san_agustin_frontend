import { useState, useEffect } from 'react';
import { LogOut, LayoutDashboard, Building2, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import DashboardOverview from './DashboardOverview';
import VenuesDashboard from './VenuesDashboard';
import EventsSection from './EventsSection';
import SettingsSection from './SettingsSection';
import { authService } from '@/lib/auth';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    const loadUser = async () => {
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
    };
    loadUser();
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('overview');
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Tu San Agustín - Admin
              </h1>
              {currentUser && (
                <div className="mt-1 flex items-center gap-2">
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
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Resumen</span>
            </TabsTrigger>
            <TabsTrigger value="venues" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Lugares</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Eventos</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="venues" className="space-y-4">
            <VenuesDashboard hideHeader={true} />
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <EventsSection />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
