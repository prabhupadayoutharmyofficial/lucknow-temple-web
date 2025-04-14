
import React from 'react';
import { Home, Utensils, BookOpen, ShoppingBag, Coffee, Wifi } from 'lucide-react';

const FacilitiesSection = () => {
  return (
    <div className="space-y-6 text-lg">
      <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Facilities Available</h3>
      <div className="bg-gradient-to-r from-krishna-blue/10 to-transparent p-6 rounded-lg">
        <p className="mb-6">
          Our temple offers various facilities to ensure a pleasant and spiritually enriching experience 
          for all visitors and devotees. Here are some of the amenities available at ISKCON Lucknow:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
            <Home className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-krishna-blue">Guest House</h4>
              <p className="text-sm text-gray-600">
                Comfortable accommodation facilities for devotees and visitors, available at nominal charges. 
                Advanced booking is recommended during festivals.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
            <Utensils className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-krishna-blue">Govinda's Restaurant</h4>
              <p className="text-sm text-gray-600">
                Serves delicious pure vegetarian prasadam prepared with love and devotion. 
                The restaurant is open daily from 11 AM to 9 PM.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
            <BookOpen className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-krishna-blue">Library</h4>
              <p className="text-sm text-gray-600">
                Extensive collection of spiritual books, manuscripts, and multimedia resources 
                for study and research.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
            <ShoppingBag className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-krishna-blue">Gift Shop</h4>
              <p className="text-sm text-gray-600">
                Offers a wide range of spiritual items, books, devotional accessories, clothing, 
                and prasadam products.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
            <Coffee className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-krishna-blue">Prasadam Hall</h4>
              <p className="text-sm text-gray-600">
                Spacious hall where free prasadam is distributed to devotees, especially 
                during festivals and weekly Sunday feasts.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-md flex items-start gap-3">
            <Wifi className="text-krishna-blue h-6 w-6 shrink-0 mt-1" />
            <div>
              <h4 className="font-medium text-krishna-blue">Free Wi-Fi</h4>
              <p className="text-sm text-gray-600">
                Complimentary Wi-Fi available throughout the temple premises for devotees 
                and visitors.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 p-4 rounded border border-krishna-gold/30">
          <p className="text-sm">
            <span className="font-medium">Note:</span> All facilities are available during temple opening hours. 
            For special assistance or requirements, please contact the temple administration office.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilitiesSection;
