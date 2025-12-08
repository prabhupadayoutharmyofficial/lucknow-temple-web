
import React, { useEffect } from 'react';

const GALLERY_HERO_IMAGE = 'https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/g03-sri-lord-krishna-1200x800.jpg';

const GalleryHero = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = GALLERY_HERO_IMAGE;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }, []);
  return (
    <div className="relative h-[80vh] bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: `url('${GALLERY_HERO_IMAGE}')`
      }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative text-center text-white z-10">
        <h1 className="font-devotional text-5xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-xl max-w-3xl mx-auto">Glimpses from our temple, deities, festivals, and prasadam</p>
      </div>
    </div>
  );
};

export default GalleryHero;
