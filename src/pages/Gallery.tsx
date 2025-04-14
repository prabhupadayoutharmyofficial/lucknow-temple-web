
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, User, Utensils, Calendar } from 'lucide-react';

const templePhotos = [
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
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1612805232759-9008b427f7fb?q=80&w=1974&auto=format&fit=crop",
    alt: "Temple Dome"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1577193661706-85db41b934c5?q=80&w=2070&auto=format&fit=crop",
    alt: "Temple at Night"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1626157869738-46be67fd58fd?q=80&w=2070&auto=format&fit=crop",
    alt: "Temple Gardens"
  }
];

const deityPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1621965958162-5043761957e1?q=80&w=2070&auto=format&fit=crop",
    alt: "Sri Sri Radha Krishna"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1577715696282-d91979bd3c9a?q=80&w=2052&auto=format&fit=crop",
    alt: "Lord Krishna"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1575844264771-892081089af0?q=80&w=1974&auto=format&fit=crop",
    alt: "Gaura Nitai"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1583448169361-6d89cae14ceb?q=80&w=2071&auto=format&fit=crop",
    alt: "Lord Jagannath"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1581475247801-a3a5432de57a?q=80&w=1974&auto=format&fit=crop",
    alt: "Deities in Festival Dress"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1621252780153-a1fec1d3159f?q=80&w=1974&auto=format&fit=crop",
    alt: "Deities with Offerings"
  }
];

const festivalPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1604608672516-f1b9b1d37097?q=80&w=1974&auto=format&fit=crop",
    alt: "Janmashtami Celebration"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1629128715741-d5b76e9c93a3?q=80&w=1974&auto=format&fit=crop",
    alt: "Ratha Yatra"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1624204386084-be258212f1e4?q=80&w=2070&auto=format&fit=crop",
    alt: "Holi Celebration"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?q=80&w=2070&auto=format&fit=crop",
    alt: "Gaura Purnima"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1642559331338-5f3e30c6bf50?q=80&w=1974&auto=format&fit=crop",
    alt: "Diwali Celebration"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1547127796-06bb04e4b315?q=80&w=1974&auto=format&fit=crop",
    alt: "Cultural Performance"
  }
];

const prasadamPhotos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1974&auto=format&fit=crop",
    alt: "Temple Prasadam"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop",
    alt: "Festival Feast"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1536489885071-87983c3e2859?q=80&w=2070&auto=format&fit=crop",
    alt: "Sweet Offerings"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=1970&auto=format&fit=crop",
    alt: "Prasadam Distribution"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=2070&auto=format&fit=crop",
    alt: "Ekadashi Special"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1645094805539-a89dd9e344b8?q=80&w=2070&auto=format&fit=crop",
    alt: "Community Dining"
  }
];

const Gallery = () => {
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
              <PhotoGallery photos={templePhotos} />
            </TabsContent>
            
            <TabsContent value="deities">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Deities Photos</h2>
              <PhotoGallery photos={deityPhotos} />
            </TabsContent>
            
            <TabsContent value="festivals">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Festival Photos</h2>
              <PhotoGallery photos={festivalPhotos} />
            </TabsContent>
            
            <TabsContent value="prasadam">
              <h2 className="font-devotional text-2xl font-semibold text-krishna-blue mb-6">Prasadam Photos</h2>
              <PhotoGallery photos={prasadamPhotos} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
