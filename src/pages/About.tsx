
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import HistorySection from '@/components/about/HistorySection';
import TempleConstructionSection from '@/components/about/TempleConstructionSection';
import ProgramsSection from '@/components/about/ProgramsSection';
import FacilitiesSection from '@/components/about/FacilitiesSection';
import ArchitectureSection from '@/components/about/ArchitectureSection';
import AboutSidebar from '@/components/about/AboutSidebar';
import TemplePresidentSection from '@/components/about/TemplePresidentSection';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <AboutHero />
        
        {/* About Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <HistorySection />
              <TempleConstructionSection />
              <ProgramsSection />
              <FacilitiesSection />
              <ArchitectureSection />
              <TemplePresidentSection />
            </div>
            
            <div className="lg:col-span-1">
              <AboutSidebar />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
