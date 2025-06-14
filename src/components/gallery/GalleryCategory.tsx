
import React from 'react';
import PhotoGallery from '@/components/PhotoGallery';
import CollectionFilter from './CollectionFilter';

interface Photo {
  id: number;
  url: string;
  alt: string;
  collection_id?: string | null;
}

interface PhotoCollection {
  id: string;
  name: string;
  description: string | null;
}

interface GalleryCategoryProps {
  title: string;
  photos: Photo[];
  collections: PhotoCollection[];
  selectedCollection: string;
  onCollectionChange: (value: string) => void;
  currentCollectionName: string;
}

const GalleryCategory: React.FC<GalleryCategoryProps> = ({
  title,
  photos,
  collections,
  selectedCollection,
  onCollectionChange,
  currentCollectionName
}) => {
  const filteredPhotos = selectedCollection === 'all' 
    ? photos 
    : photos.filter(photo => photo.collection_id === selectedCollection);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-devotional text-2xl font-semibold text-krishna-blue">{title}</h2>
          {selectedCollection !== 'all' && (
            <p className="text-muted-foreground mt-1">
              Viewing: {currentCollectionName}
            </p>
          )}
        </div>
        <CollectionFilter
          collections={collections}
          selectedCollection={selectedCollection}
          onCollectionChange={onCollectionChange}
          currentCollectionName={currentCollectionName}
        />
      </div>
      
      {selectedCollection !== 'all' && (
        <div className="text-center py-4">
          <h3 className="font-devotional text-3xl font-bold text-krishna-blue mb-2">
            {currentCollectionName}
          </h3>
          <div className="w-24 h-1 bg-krishna-blue mx-auto rounded-full"></div>
        </div>
      )}
      
      {filteredPhotos.length > 0 ? (
        <PhotoGallery photos={filteredPhotos} />
      ) : (
        <div className="text-center py-8 text-gray-500">
          {selectedCollection !== 'all' 
            ? `No photos in "${currentCollectionName}" collection.`
            : `No ${title.toLowerCase()} photos available. Please check back later.`
          }
        </div>
      )}
    </div>
  );
};

export default GalleryCategory;
