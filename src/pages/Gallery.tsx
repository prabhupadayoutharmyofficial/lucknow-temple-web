
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryHero from '@/components/gallery/GalleryHero';
import GalleryTabs from '@/components/gallery/GalleryTabs';
import GalleryLoading from '@/components/gallery/GalleryLoading';
import { useGalleryData } from '@/hooks/useGalleryData';
import { getCollectionsForCategory, getCurrentCollectionName } from '@/utils/galleryUtils';

const Gallery = () => {
  const { photos, collections, loading } = useGalleryData();
  const [selectedCollection, setSelectedCollection] = useState<string>('all');

  const handleTabChange = () => {
    setSelectedCollection('all');
  };

  const handleGetCollectionsForCategory = (category: string) => {
    return getCollectionsForCategory(category, photos, collections);
  };

  const handleGetCurrentCollectionName = () => {
    return getCurrentCollectionName(selectedCollection, collections);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <GalleryHero />
        
        <section className="container mx-auto px-4 py-16">
          {loading ? (
            <GalleryLoading />
          ) : (
            <GalleryTabs
              photos={photos}
              collections={collections}
              selectedCollection={selectedCollection}
              onCollectionChange={setSelectedCollection}
              onTabChange={handleTabChange}
              getCollectionsForCategory={handleGetCollectionsForCategory}
              getCurrentCollectionName={handleGetCurrentCollectionName}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
