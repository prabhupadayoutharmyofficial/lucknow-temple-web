
import React from 'react';

const AboutHero = () => {
  return (
    <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: "url('https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/MIssion.jpg')"
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
