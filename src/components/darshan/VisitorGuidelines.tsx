
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const VisitorGuidelines = () => {
  return (
    <div className="lg:col-span-1">
      <Card className="mb-8 decorative-border overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-krishna-gold/10 px-6 py-4 flex items-center gap-3 border-b">
            <Info size={20} className="text-krishna-gold" />
            <h3 className="font-devotional text-xl text-krishna-blue">Visitor Guidelines</h3>
          </div>
          <div className="p-6 space-y-4">
            <h4 className="font-medium">Dress Code</h4>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li>Please dress modestly and conservatively</li>
              <li>Men: Full pants and shirts/t-shirts</li>
              <li>Women: Sarees, salwar kameez, long skirts, or modest western attire</li>
              <li>Shorts, sleeveless tops, and short skirts are not appropriate</li>
            </ul>
            
            <h4 className="font-medium pt-2">Temple Etiquette</h4>
            <ul className="list-disc ml-6 space-y-1 text-sm">
              <li>Remove footwear before entering the temple</li>
              <li>Maintain silence or speak softly inside the temple hall</li>
              <li>Photography may be restricted in certain areas</li>
              <li>Please respect the deities and the devotees</li>
              <li>Food or drinks are not allowed inside the temple hall</li>
              <li>Mobile phones should be kept on silent mode</li>
            </ul>
            
            <h4 className="font-medium pt-2">Prasadam (Sacred Food)</h4>
            <p className="text-sm">
              The temple serves prasadam (sanctified vegetarian food) to all visitors. Donations for prasadam are welcome but not mandatory.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="decorative-border">
        <CardContent className="p-6">
          <h3 className="font-devotional text-xl text-krishna-blue mb-4">Special Instructions</h3>
          <p className="text-sm mb-4">
            Ekadashi (11th day of lunar cycle) is observed with fasting from grains and beans. Temple kitchen serves special Ekadashi prasadam on these days.
          </p>
          <p className="text-sm">
            During major festivals, special schedules are followed. Please check the temple notice board or contact the temple office for festival details.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitorGuidelines;
