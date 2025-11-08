
import React from 'react';
import { Building } from 'lucide-react';

const TempleConstructionSection = () => {
  return (
    <div className="space-y-6 text-lg">
      <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Temple Construction</h3>
      <div className="bg-gradient-to-r from-krishna-gold/10 to-transparent p-6 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          <Building className="text-krishna-gold h-8 w-8" />
          <h4 className="font-devotional text-xl text-krishna-blue">Sacred Architecture</h4>
        </div>
        <p>
          The ISKCON Lucknow temple construction began in 2014 and is expected to completed in 2028.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white/80 p-4 rounded shadow-sm">
            <h5 className="font-devotional text-krishna-blue mb-2">Design Elements</h5>
            <ul className="list-disc ml-6 space-y-1">
              <li>Traditional shikhara (spire) reaching 75 feet high</li>
              <li>Makrana marble work from Uttar Pradesh</li>
            </ul>
          </div>
          <div className="bg-white/80 p-4 rounded shadow-sm">
            <h5 className="font-devotional text-krishna-blue mb-2">Construction Phases</h5>
            <ul className="list-disc ml-6 space-y-1">
              <li>Foundation ceremony: 1995</li>
              <li>Main structure completion: 1998</li>
              <li>Interior work: 1998-2000</li>
              <li>Deity installation: 2001</li>
              <li>Grand opening: 2002</li>
            </ul>
          </div>
        </div>
        
        <p className="mt-6">
          The temple stands as a testament to devotional service, built with contributions from thousands of 
          devotees worldwide. The main prayer hall can accommodate over 500 devotees at once, while the temple 
          compound spans across 3 acres of land, providing ample space for various community activities.
        </p>
      </div>
    </div>
  );
};

export default TempleConstructionSection;
