
import React from 'react';

const GalleryHero = () => {
  return (
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
  );
};

export default GalleryHero;
