
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const TemplePresidentSection = () => {
  return (
    <div className="space-y-6 text-lg">
      <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Temple President</h3>
      <div className="flex items-center space-x-6">
        <Avatar className="h-48 w-48">
          <AvatarImage 
            src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=1000&auto=format&fit=crop" 
            alt="Temple President" 
          />
          <AvatarFallback>
            <User className="h-16 w-16 text-gray-500" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-xl font-semibold text-krishna-blue">H.G Aparimay Shyam Das</h4>
          <p className="text-gray-600">Spiritual Leader and Temple President</p>
        </div>
      </div>
      <p>
        H.G Aparimay Shyam Das has been guiding the ISKCON Lucknow temple since 2014, 
        bringing decades of spiritual experience and dedication to the community. 
        His leadership focuses on spreading the message of Krishna consciousness, 
        promoting spiritual education, and serving the local community.
      </p>
      <p>
        Under his guidance, the temple has expanded its outreach programs, 
        conducted numerous spiritual workshops, and maintained a vibrant 
        cultural and spiritual environment for devotees and visitors alike.
      </p>
    </div>
  );
};

export default TemplePresidentSection;
