
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Folder, FolderOpen } from 'lucide-react';

interface PhotoCollection {
  id: string;
  name: string;
  description: string | null;
}

interface CollectionFilterProps {
  collections: PhotoCollection[];
  selectedCollection: string;
  onCollectionChange: (value: string) => void;
  currentCollectionName: string;
}

const CollectionFilter: React.FC<CollectionFilterProps> = ({
  collections,
  selectedCollection,
  onCollectionChange,
  currentCollectionName
}) => {
  if (collections.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Folder size={16} className="text-muted-foreground" />
      <Select value={selectedCollection} onValueChange={onCollectionChange}>
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
          {collections.map((collection) => (
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
  );
};

export default CollectionFilter;
