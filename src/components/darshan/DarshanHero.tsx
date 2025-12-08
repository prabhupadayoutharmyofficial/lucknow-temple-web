
import React, { useEffect } from 'react';

const DARSHAN_HERO_IMAGE = 'https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/temple-schedule%20BACKGROUND2.png';

const DarshanHero = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = DARSHAN_HERO_IMAGE;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  }, []);
  return (
    <div className="relative h-[80vh] bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: `url('${DARSHAN_HERO_IMAGE}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative text-center text-white z-10">
        <h1 className="font-devotional text-5xl font-bold mb-4">Temple Schedule</h1>
        <p className="text-xl max-w-3xl mx-auto">Darshan timings, aarti schedule, and festival calendar</p>
      </div>
    </div>
  );
};

export default DarshanHero;
