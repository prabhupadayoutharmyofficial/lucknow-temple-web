
import React, { useEffect } from 'react';

const ABOUT_HERO_IMAGE = 'https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/MIssion.jpg';

const AboutHero = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = ABOUT_HERO_IMAGE;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }, []);
  return (
    <div className="relative h-[80vh] bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: `url('${ABOUT_HERO_IMAGE}')`
      }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative text-center text-white z-10">
        <h1 className="font-devotional text-5xl font-bold mb-4">About ISKCON Lucknow</h1>
        <p className="text-xl max-w-3xl mx-auto">Discover our temple's history, mission, and principles</p>
      </div>
    </div>
  );
};

export default AboutHero;
