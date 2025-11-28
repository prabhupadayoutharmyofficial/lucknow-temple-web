
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="space-y-6">
            <h2 className="font-devotional text-3xl font-semibold text-krishna-blue">
              About Iskcon Lucknow Temple
            </h2>
            <p className="text-lg text-gray-700">
              The International Society for Krishna Consciousness (ISKCON) 
              Lucknow temple is a spiritual sanctuary dedicated to the worship of 
              Lord Krishna. Our beautiful temple serves as a center for spiritual 
              growth, Vedic education, and cultural activities.
            </p>
            <p className="text-lg text-gray-700">
              Founded on the principles taught by His Divine Grace A.C. Bhaktivedanta 
              Swami Prabhupada, our temple offers a serene environment for meditation, 
              prayer, and spiritual learning. We welcome everyone, regardless of background,
              to join us in experiencing the divine love of Lord Krishna.
            </p>
            <Link to="/about">
              <Button className="mt-6 bg-krishna-gold hover:bg-krishna-saffron text-white gap-2">
                Learn More About Us
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 border-l-4 border-t-4 border-krishna-gold opacity-60"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-r-4 border-b-4 border-krishna-gold opacity-60"></div>
            <img 
              src="https://jjiyqxfotpfwdiwdexzp.supabase.co/storage/v1/object/public/Media/iskconlucknowlogo.png" 
              alt="ISKCON Lucknow Temple" 
              className="rounded-lg shadow-xl max-h-[500px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
