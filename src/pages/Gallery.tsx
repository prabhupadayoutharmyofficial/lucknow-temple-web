import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryTabs from '@/components/gallery/GalleryTabs';
import { supabase } from '@/integrations/supabase/client';

interface Photo {
  id: number;
  url: string;
  alt: string;
}

interface GalleryPhoto {
  id: string;
  category: string;
  url: string;
  alt: string;
  display_order: number;
  collection_id: string | null;
}

interface PhotoCollection {
  id: string;
  name: string;
  description: string | null;
}

const Gallery = () => {
  const [photos, setPhotos] = useState<{
    temple: Photo[];
    deities: Photo[];
    festivals: Photo[];
    prasadam: Photo[];
  }>({
    temple: [],
    deities: [],
    festivals: [],
    prasadam: []
  });
  const [collections, setCollections] = useState<PhotoCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('photo_collections')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      // Group photos by category and transform to match expected format
      const groupedPhotos = (data || []).reduce((acc: any, photo: GalleryPhoto) => {
        if (!acc[photo.category]) {
          acc[photo.category] = [];
        }
        acc[photo.category].push({
          id: parseInt(photo.id), // Convert string id to number for PhotoGallery component
          url: photo.url,
          alt: photo.alt,
          collection_id: photo.collection_id
        });
        return acc;
      }, {});

      setPhotos({
        temple: groupedPhotos.temple || [],
        deities: groupedPhotos.deities || [],
        festivals: groupedPhotos.festivals || [],
        prasadam: groupedPhotos.prasadam || []
      });
    } catch (error) {
      console.error('Error fetching photos:', error);
      // Fallback to static photos if database fetch fails
      setPhotos({
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
      });
    } finally {
      setLoading(false);
    }
  };

  const getCollectionsForCategory = (category: string) => {
    // Get all photos for this category
    const categoryPhotos = photos[category as keyof typeof photos];
    // Get unique collection IDs from photos in this category
    const collectionIds = [...new Set(categoryPhotos
      .map((photo: any) => photo.collection_id)
      .filter(id => id !== null)
    )];
    // Return collections that have photos in this category
    return collections.filter(collection => collectionIds.includes(collection.id));
  };

  const getCurrentCollectionName = () => {
    if (selectedCollection === 'all') return 'All Photos';
    const collection = collections.find(c => c.id === selectedCollection);
    return collection ? collection.name : 'Unknown Collection';
  };

  const handleTabChange = () => {
    setSelectedCollection('all');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <GalleryHero />
        
        <section className="container mx-auto px-4 py-16">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-krishna-blue mx-auto"></div>
              <p className="mt-4">Loading gallery...</p>
            </div>
          ) : (
            <GalleryTabs
              photos={photos}
              collections={collections}
              selectedCollection={selectedCollection}
              onCollectionChange={setSelectedCollection}
              onTabChange={handleTabChange}
              getCollectionsForCategory={getCollectionsForCategory}
              getCurrentCollectionName={getCurrentCollectionName}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
