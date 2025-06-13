
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Settings, Calendar, MapPin, Users } from 'lucide-react';
import AdminEvents from '@/components/admin/AdminEvents';
import AdminTempleInfo from '@/components/admin/AdminTempleInfo';
import AdminSchedule from '@/components/admin/AdminSchedule';
import AdminHero from '@/components/admin/AdminHero';

const Admin = () => {
  const { user, profile, loading, isAdmin } = useAuth();

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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Access Denied</CardTitle>
              <CardDescription className="text-center">
                You don't have admin privileges to access this page.
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-krishna-blue text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8" />
              <h1 className="font-devotional text-3xl md:text-4xl">Admin Dashboard</h1>
            </div>
            <p className="text-lg">
              Welcome back, {profile?.full_name || 'Admin'}! Manage your temple website content.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="temple" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Temple Info
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Schedule
              </TabsTrigger>
              <TabsTrigger value="hero" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Homepage
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="events" className="mt-6">
              <AdminEvents />
            </TabsContent>
            
            <TabsContent value="temple" className="mt-6">
              <AdminTempleInfo />
            </TabsContent>
            
            <TabsContent value="schedule" className="mt-6">
              <AdminSchedule />
            </TabsContent>
            
            <TabsContent value="hero" className="mt-6">
              <AdminHero />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
