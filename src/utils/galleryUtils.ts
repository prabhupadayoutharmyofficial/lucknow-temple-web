
interface PhotoCollection {
  id: string;
  name: string;
  description: string | null;
}

interface Photo {
  id: number;
  url: string;
  alt: string;
  collection_id?: string | null;
}

export const getCollectionsForCategory = (
  category: string,
  photos: { [key: string]: Photo[] },
  collections: PhotoCollection[]
) => {
  // Get all photos for this category
  const categoryPhotos = photos[category] || [];
  // Get unique collection IDs from photos in this category
  const collectionIds = [...new Set(categoryPhotos
    .map((photo: Photo) => photo.collection_id)
    .filter(id => id !== null)
  )];
  // Return collections that have photos in this category
  return collections.filter(collection => collectionIds.includes(collection.id));
};

export const getCurrentCollectionName = (
  selectedCollection: string,
  collections: PhotoCollection[]
) => {
  if (selectedCollection === 'all') return 'All Photos';
  const collection = collections.find(c => c.id === selectedCollection);
  return collection ? collection.name : 'Unknown Collection';
};
