
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const FloatingDonateButton = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button 
        className="bg-krishna-gold hover:bg-krishna-saffron text-white rounded-full p-4 shadow-lg animate-pulse flex items-center justify-center"
        asChild
      >
        <Link to="/donate" className="flex items-center justify-center">
          <Heart className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  );
};

export default FloatingDonateButton;
