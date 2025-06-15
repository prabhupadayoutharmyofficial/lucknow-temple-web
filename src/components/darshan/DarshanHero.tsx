
import React from 'react';

const DarshanHero = () => {
  return (
    <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
      style={{ 
        backgroundImage: "url('')"
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
