
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Photo {
  id: number;
  url: string;
  alt: string;
  media_type?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
  className?: string;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, className }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    setOpen(true);
  };

  const closeLightbox = () => {
    setOpen(false);
    setTimeout(() => setSelectedPhotoIndex(null), 300); // Wait for dialog transition to complete
  };

  const goToPrevious = () => {
    setSelectedPhotoIndex((prevIndex) => 
      prevIndex === null || prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setSelectedPhotoIndex((prevIndex) => 
      prevIndex === null || prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={cn("", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <div 
            key={photo.id} 
            className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted relative group"
            onClick={() => openLightbox(index)}
          >
            {photo.media_type === 'video' ? (
              <>
                <video 
                  src={photo.url} 
                  className="h-full w-full object-contain"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="bg-primary rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-primary-foreground fill-current" />
                  </div>
                </div>
              </>
            ) : (
              <img 
                src={photo.url} 
                alt={photo.alt} 
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-full max-h-[90vh] p-0 bg-black/90">
          <div className="relative h-full w-full flex items-center justify-center">
            {selectedPhotoIndex !== null && (
              photos[selectedPhotoIndex].media_type === 'video' ? (
                <video 
                  src={photos[selectedPhotoIndex].url} 
                  controls
                  autoPlay
                  className="max-h-[80vh] max-w-full object-contain"
                />
              ) : (
                <img 
                  src={photos[selectedPhotoIndex].url} 
                  alt={photos[selectedPhotoIndex].alt} 
                  className="max-h-[80vh] max-w-full object-contain"
                />
              )
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 text-white hover:bg-white/20 rounded-full"
              onClick={closeLightbox}
            >
              <X />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
              onClick={goToPrevious}
            >
              <ChevronLeft size={24} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
