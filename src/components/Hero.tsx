
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[90vh]">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-center text-white text-center pt-60">
        <div className="animate-fadeIn opacity-0" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-devotional text-4xl md:text-6xl font-bold mb-6">
            Shri Shri Radha Raman Bihari
          </h1>
          <p className="font-devotional text-xl md:text-3xl max-w-3xl mx-auto mb-10">
            Iskcon Lucknow Temple
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-krishna-gold hover:bg-krishna-saffron text-white text-lg px-6 py-6" asChild>
              <Link to="/visit">Visit the Temple</Link>
            </Button>
            <Button variant="outline" className="bg-transparent border-white hover:bg-white/20 text-white text-lg px-6 py-6" asChild>
              <Link to="/darshan">
                <Calendar className="mr-2" />
                View Schedule
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-krishna-gold via-krishna-saffron to-krishna-lotus"></div>
    </div>
  );
};

export default Hero;
