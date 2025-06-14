
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, User, Utensils, Calendar, Folder, FolderOpen } from 'lucide-react';
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

  const filterPhotosByCollection = (categoryPhotos: any[], category: string) => {
    if (selectedCollection === 'all') {
      return categoryPhotos;
    }
    return categoryPhotos.filter(photo => photo.collection_id === selectedCollection);
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
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-krishna-blue mx-auto"></div>
              <p className="mt-4">Loading gallery...</p>
            </div>
          ) : (
            <Tabs defaultValue="temple" className="w-full" onValueChange={() => setSelectedCollection('all')}>
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
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-devotional text-2xl font-semibold text-krishna-blue">Temple Photos</h2>
                      {selectedCollection !== 'all' && (
                        <p className="text-muted-foreground mt-1">
                          Viewing: {getCurrentCollectionName()}
                        </p>
                      )}
                    </div>
                    {getCollectionsForCategory('temple').length > 0 && (
                      <div className="flex items-center gap-2">
                        <Folder size={16} className="text-muted-foreground" />
                        <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All photos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <div className="flex items-center gap-2">
                                <FolderOpen size={14} />
                                All Photos
                              </div>
                            </SelectItem>
                            {getCollectionsForCategory('temple').map((collection) => (
                              <SelectItem key={collection.id} value={collection.id}>
                                <div className="flex items-center gap-2">
                                  <Folder size={14} />
                                  {collection.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  {filterPhotosByCollection(photos.temple, 'temple').length > 0 ? (
                    <PhotoGallery photos={filterPhotosByCollection(photos.temple, 'temple')} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {selectedCollection !== 'all' 
                        ? `No photos in "${getCurrentCollectionName()}" collection.`
                        : "No temple photos available. Please check back later."
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="deities">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-devotional text-2xl font-semibold text-krishna-blue">Deities Photos</h2>
                      {selectedCollection !== 'all' && (
                        <p className="text-muted-foreground mt-1">
                          Viewing: {getCurrentCollectionName()}
                        </p>
                      )}
                    </div>
                    {getCollectionsForCategory('deities').length > 0 && (
                      <div className="flex items-center gap-2">
                        <Folder size={16} className="text-muted-foreground" />
                        <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All photos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <div className="flex items-center gap-2">
                                <FolderOpen size={14} />
                                All Photos
                              </div>
                            </SelectItem>
                            {getCollectionsForCategory('deities').map((collection) => (
                              <SelectItem key={collection.id} value={collection.id}>
                                <div className="flex items-center gap-2">
                                  <Folder size={14} />
                                  {collection.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  {filterPhotosByCollection(photos.deities, 'deities').length > 0 ? (
                    <PhotoGallery photos={filterPhotosByCollection(photos.deities, 'deities')} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {selectedCollection !== 'all' 
                        ? `No photos in "${getCurrentCollectionName()}" collection.`
                        : "No deity photos available. Please check back later."
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="festivals">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-devotional text-2xl font-semibold text-krishna-blue">Festival Photos</h2>
                      {selectedCollection !== 'all' && (
                        <p className="text-muted-foreground mt-1">
                          Viewing: {getCurrentCollectionName()}
                        </p>
                      )}
                    </div>
                    {getCollectionsForCategory('festivals').length > 0 && (
                      <div className="flex items-center gap-2">
                        <Folder size={16} className="text-muted-foreground" />
                        <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All photos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <div className="flex items-center gap-2">
                                <FolderOpen size={14} />
                                All Photos
                              </div>
                            </SelectItem>
                            {getCollectionsForCategory('festivals').map((collection) => (
                              <SelectItem key={collection.id} value={collection.id}>
                                <div className="flex items-center gap-2">
                                  <Folder size={14} />
                                  {collection.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  {filterPhotosByCollection(photos.festivals, 'festivals').length > 0 ? (
                    <PhotoGallery photos={filterPhotosByCollection(photos.festivals, 'festivals')} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {selectedCollection !== 'all' 
                        ? `No photos in "${getCurrentCollectionName()}" collection.`
                        : "No festival photos available. Please check back later."
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="prasadam">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="font-devotional text-2xl font-semibold text-krishna-blue">Prasadam Photos</h2>
                      {selectedCollection !== 'all' && (
                        <p className="text-muted-foreground mt-1">
                          Viewing: {getCurrentCollectionName()}
                        </p>
                      )}
                    </div>
                    {getCollectionsForCategory('prasadam').length > 0 && (
                      <div className="flex items-center gap-2">
                        <Folder size={16} className="text-muted-foreground" />
                        <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All photos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <div className="flex items-center gap-2">
                                <FolderOpen size={14} />
                                All Photos
                              </div>
                            </SelectItem>
                            {getCollectionsForCategory('prasadam').map((collection) => (
                              <SelectItem key={collection.id} value={collection.id}>
                                <div className="flex items-center gap-2">
                                  <Folder size={14} />
                                  {collection.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  {filterPhotosByCollection(photos.prasadam, 'prasadam').length > 0 ? (
                    <PhotoGallery photos={filterPhotosByCollection(photos.prasadam, 'prasadam')} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      {selectedCollection !== 'all' 
                        ? `No photos in "${getCurrentCollectionName()}" collection.`
                        : "No prasadam photos available. Please check back later."
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
