
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, User, Utensils, Calendar, Clock } from 'lucide-react';
import GalleryCategory from './GalleryCategory';

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

interface GalleryTabsProps {
  photos: {
    temple: Photo[];
    deities: Photo[];
    festivals: Photo[];
    prasadam: Photo[];
    dailyDarshan: Photo[];
  };
  collections: PhotoCollection[];
  selectedCollection: string;
  onCollectionChange: (value: string) => void;
  onTabChange: () => void;
  getCollectionsForCategory: (category: string) => PhotoCollection[];
  getCurrentCollectionName: () => string;
}

const GalleryTabs: React.FC<GalleryTabsProps> = ({
  photos,
  collections,
  selectedCollection,
  onCollectionChange,
  onTabChange,
  getCollectionsForCategory,
  getCurrentCollectionName
}) => {
  return (
    <Tabs defaultValue="temple" className="w-full" onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 mb-8">
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
        <TabsTrigger value="dailyDarshan" className="flex items-center gap-2">
          <Clock size={16} />
          Daily Darshan
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="temple">
        <GalleryCategory
          title="Temple Photos"
          photos={photos.temple}
          collections={getCollectionsForCategory('temple')}
          selectedCollection={selectedCollection}
          onCollectionChange={onCollectionChange}
          currentCollectionName={getCurrentCollectionName()}
        />
      </TabsContent>
      
      <TabsContent value="deities">
        <GalleryCategory
          title="Deities Photos"
          photos={photos.deities}
          collections={getCollectionsForCategory('deities')}
          selectedCollection={selectedCollection}
          onCollectionChange={onCollectionChange}
          currentCollectionName={getCurrentCollectionName()}
        />
      </TabsContent>
      
      <TabsContent value="festivals">
        <GalleryCategory
          title="Festival Photos"
          photos={photos.festivals}
          collections={getCollectionsForCategory('festivals')}
          selectedCollection={selectedCollection}
          onCollectionChange={onCollectionChange}
          currentCollectionName={getCurrentCollectionName()}
        />
      </TabsContent>
      
      <TabsContent value="prasadam">
        <GalleryCategory
          title="Prasadam Photos"
          photos={photos.prasadam}
          collections={getCollectionsForCategory('prasadam')}
          selectedCollection={selectedCollection}
          onCollectionChange={onCollectionChange}
          currentCollectionName={getCurrentCollectionName()}
        />
      </TabsContent>
      
      <TabsContent value="dailyDarshan">
        <GalleryCategory
          title="Daily Darshan Photos"
          photos={photos.dailyDarshan}
          collections={getCollectionsForCategory('dailyDarshan')}
          selectedCollection={selectedCollection}
          onCollectionChange={onCollectionChange}
          currentCollectionName={getCurrentCollectionName()}
        />
      </TabsContent>
    </Tabs>
  );
};

export default GalleryTabs;
