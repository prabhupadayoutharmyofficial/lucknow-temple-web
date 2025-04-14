
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Calendar } from 'lucide-react';

interface TempleInfoProps {
  className?: string;
}

const TempleInfo: React.FC<TempleInfoProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-devotional text-xl text-krishna-blue">Temple Information</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="shrink-0 text-krishna-gold mt-1" />
            <div>
              <strong className="block">Address</strong>
              <p>ISKCON Temple, Aliganj</p>
              <p>Lucknow, Uttar Pradesh</p>
              <p>India - 226024</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="shrink-0 text-krishna-gold mt-1" />
            <div>
              <strong className="block">Phone</strong>
              <p>+91 123 456 7890</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="shrink-0 text-krishna-gold mt-1" />
            <div>
              <strong className="block">Darshan Hours</strong>
              <p>4:30 AM - 12:30 PM</p>
              <p>4:00 PM - 9:00 PM</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="shrink-0 text-krishna-gold mt-1" />
            <div>
              <strong className="block">Special Program Days</strong>
              <p>Sunday - Special Feast Program</p>
              <p>Tuesday - Bhagavad Gita Class</p>
              <p>Friday - Bhajan Night</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TempleInfo;
