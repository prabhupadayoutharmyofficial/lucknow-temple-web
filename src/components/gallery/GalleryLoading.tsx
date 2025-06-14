
import React from 'react';

const GalleryLoading = () => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-krishna-blue mx-auto"></div>
      <p className="mt-4">Loading gallery...</p>
    </div>
  );
};

export default GalleryLoading;
