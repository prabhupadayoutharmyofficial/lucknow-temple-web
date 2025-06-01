
import React from 'react';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import FeaturedEvents from '@/components/FeaturedEvents';
import DarshanSchedule from '@/components/DarshanSchedule';
import TempleInfo from '@/components/TempleInfo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin } from 'lucide-react';

const Index = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 animate-bounce"
            onClick={scrollToContent}
          >
            <ChevronDown size={24} />
          </Button>
        </div>
        
        {/* Welcome & About Section */}
        <section className="py-20">
          <AboutSection />
        </section>
        
        {/* Featured Events */}
        <FeaturedEvents />
        
        {/* Temple Schedule and Info */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DarshanSchedule />
            <div className="space-y-8">
              <TempleInfo />
              <div className="rounded-lg overflow-hidden shadow-lg h-[300px] border">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.260948798046!2d80.92994757651246!3d26.89424067669716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd7dfed76d05%3A0x826a93fc6b6c57b2!2sISKCON%20Lucknow%20Vrindavan%20Dham%20-%20International%20Society%20for%20Krishna%20Consciousness!5e0!3m2!1sen!2sin!4v1735744950377!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="ISKCON Lucknow Map"
                ></iframe>
              </div>
              <Button 
                className="w-full flex gap-2 bg-krishna-blue hover:bg-krishna-blue/80 text-white"
                onClick={() => window.open('https://maps.app.goo.gl/w4ScCjeGWWuQ2TpS8', '_blank')}
              >
                <MapPin size={16} />
                Get Directions
              </Button>
            </div>
          </div>
        </section>
        
        {/* Donation Call to Action */}
        <section className="bg-gradient-to-r from-krishna-blue to-krishna-blue/90 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-devotional text-3xl md:text-4xl font-semibold mb-6">
              Support the Temple's Mission
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Your generous donations help us maintain the temple services, organize festivals, 
              and distribute free meals through our Food for Life program.
            </p>
            <Button className="bg-krishna-gold hover:bg-krishna-saffron text-white text-lg px-8 py-6">
              Make a Donation
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
