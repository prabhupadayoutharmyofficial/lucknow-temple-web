
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Settings, Calendar, MapPin, Users, Camera, MessageSquare, Clock } from 'lucide-react';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminTempleInfo from '@/components/admin/AdminTempleInfo';
import AdminSchedule from '@/components/admin/AdminSchedule';
import AdminHero from '@/components/admin/AdminHero';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminGallery from '@/components/admin/AdminGallery';
import AdminPopupManager from '@/components/admin/AdminPopupManager';
import AdminFestivalCalendar from '@/components/admin/AdminFestivalCalendar';
import { usePermissions } from '@/hooks/usePermissions';

const Admin = () => {
  const { user, profile, loading } = useAuth();
  const permissions = usePermissions();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-krishna-blue mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!permissions.canAccessAdminPanel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
              <CardDescription className="text-center">
                You don't have permissions to access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const getAvailableTabs = () => {
    const tabs = [];
    
    if (permissions.canViewEvents) {
      tabs.push({ value: 'events', label: 'Events', icon: Calendar });
    }
    
    if (permissions.canManageTempleInfo) {
      tabs.push({ value: 'temple', label: 'Temple Info', icon: MapPin });
    }
    
    if (permissions.canManageSchedule) {
      tabs.push({ value: 'schedule', label: 'Daily Schedule', icon: Clock });
    }
    
    if (permissions.canManageFestivals) {
      tabs.push({ value: 'festivals', label: 'Festivals', icon: Calendar });
    }
    
    if (permissions.canManageHero) {
      tabs.push({ value: 'hero', label: 'Homepage', icon: Shield });
    }
    
    if (permissions.canManageGallery) {
      tabs.push({ value: 'gallery', label: 'Gallery', icon: Camera });
    }
    
    if (permissions.canManagePopups) {
      tabs.push({ value: 'popup', label: 'Popup', icon: MessageSquare });
    }
    
    if (permissions.canViewUsers) {
      tabs.push({ value: 'users', label: 'Users', icon: Users });
    }
    
    return tabs;
  };

  const availableTabs = getAvailableTabs();
  const defaultTab = availableTabs.length > 0 ? availableTabs[0].value : 'events';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-krishna-blue text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8" />
              <h1 className="font-devotional text-3xl md:text-4xl">
                {profile?.role === 'moderator' ? 'Moderator Dashboard' : 'Admin Dashboard'}
              </h1>
            </div>
            <p className="text-lg">
              Welcome back, {profile?.full_name || 'Admin'}! Manage your temple website content.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className={`grid w-full grid-cols-${Math.min(availableTabs.length, 4)} lg:grid-cols-${availableTabs.length}`}>
              {availableTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            
            {permissions.canViewEvents && (
              <TabsContent value="events" className="mt-6">
                <AdminEvents />
              </TabsContent>
            )}
            
            {permissions.canManageTempleInfo && (
              <TabsContent value="temple" className="mt-6">
                <AdminTempleInfo />
              </TabsContent>
            )}
            
            {permissions.canManageSchedule && (
              <TabsContent value="schedule" className="mt-6">
                <AdminSchedule />
              </TabsContent>
            )}
            
            {permissions.canManageFestivals && (
              <TabsContent value="festivals" className="mt-6">
                <AdminFestivalCalendar />
              </TabsContent>
            )}
            
            {permissions.canManageHero && (
              <TabsContent value="hero" className="mt-6">
                <AdminHero />
              </TabsContent>
            )}
            
            {permissions.canManageGallery && (
              <TabsContent value="gallery" className="mt-6">
                <AdminGallery />
              </TabsContent>
            )}
            
            {permissions.canManagePopups && (
              <TabsContent value="popup" className="mt-6">
                <AdminPopupManager />
              </TabsContent>
            )}
            
            {permissions.canViewUsers && (
              <TabsContent value="users" className="mt-6">
                <AdminUsers />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
