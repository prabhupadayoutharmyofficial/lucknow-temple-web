
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, User, Utensils, Calendar } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

const Gallery = () => {
  // Static fallback photos
  const photos = {
    temple: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070&auto=format&fit=crop",
        alt: "Temple Front View"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1624956148296-11dda06b7f7a?q=80&w=2070&auto=format&fit=crop",
        alt: "Temple Architecture"
      },
      {
        id: 3,
        url: "https://images.unsplash.com/photo-1601405993159-3c09b34b23cc?q=80&w=2070&auto=format&fit=crop",
        alt: "Temple Interior"
      }
    ],
    deities: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1621965958162-5043761957e1?q=80&w=2070&auto=format&fit=crop",
        alt: "Sri Sri Radha Krishna"
      },
      {
        id: 2,
        url: "https://images.unsplash.com/photo-1577715696282-d91979bd3c9a?q=80&w=2052&auto=format&fit=crop",
        alt: "Lord Krishna"
      }
    ],
    festivals: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37097?q=80&w=1974&auto=format&fit=crop",
        alt: "Janmashtami Celebration"
      }
    ],
    prasadam: [
      {
        id: 1,
        url: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1974&auto=format&fit=crop",
        alt: "Temple Prasadam"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1583291277511-f2dbcced05b3?q=80&w=2069&auto=format&fit=crop')"
          }}>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">Photo Gallery</h1>
            <p className="text-xl max-w-3xl mx-auto">Glimpses from our temple, deities, festivals, and prasadam</p>
          </div>
        </div>
        
        {/* Gallery Content */}
        <section className="container mx-auto px-4 py-16">
          <Tabs defaultValue="temple" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="temple" className="flex items-center gap-2">
                <Camera size={16} />
                Temple
              </TabsTrigger>
              <TabsTrigger value="deities" className="flex items-center gap-2">
                <User size={16} />
                Deities
              </TabsTrigger>
              <TabsTrigger value="festivals" className="flex items-center gap-2">
                <Calendar size={16} />
                Festivals
              </TabsTrigger>
              <TabsTrigger value="prasadam" className="flex items-center gap-2">
                <Utensils size={16} />
                Prasadam
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="temple">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Temple Photos</h2>
              <PhotoGallery photos={photos.temple} />
            </TabsContent>
            
            <TabsContent value="deities">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Deities Photos</h2>
              <PhotoGallery photos={photos.deities} />
            </TabsContent>
            
            <TabsContent value="festivals">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Festival Photos</h2>
              <PhotoGallery photos={photos.festivals} />
            </TabsContent>
            
            <TabsContent value="prasadam">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Prasadam Photos</h2>
              <PhotoGallery photos={photos.prasadam} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
