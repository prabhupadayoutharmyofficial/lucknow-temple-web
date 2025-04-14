
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1621507624347-9303588463d3?q=80&w=2070&auto=format&fit=crop')"
          }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">About ISKCON Lucknow</h1>
            <p className="text-xl max-w-3xl mx-auto">Discover our temple's history, mission, and principles</p>
          </div>
        </div>
        
        {/* About Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-8">Our History</h2>
              <div className="space-y-6 text-lg">
                <p>
                  The International Society for Krishna Consciousness (ISKCON) was established in 1966 by His Divine Grace 
                  A.C. Bhaktivedanta Swami Prabhupada. The ISKCON Lucknow temple was established in the early 1990s and 
                  has since grown to become one of the prominent spiritual centers in the city.
                </p>
                <p>
                  The temple is dedicated to Lord Krishna and Srimati Radharani, known as Sri Sri Radha Krishna. The temple 
                  follows the Vaishnava tradition, one of the major Hindu denominations, which worships Vishnu or Krishna 
                  as the Supreme Lord.
                </p>
                <p>
                  Over the years, ISKCON Lucknow has expanded its services and outreach programs, serving the community through 
                  various spiritual and charitable activities. The temple has become not just a place of worship, but also 
                  a cultural center that promotes Vedic knowledge, arts, and traditions.
                </p>
                
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Our Mission</h3>
                <p>
                  ISKCON Lucknow's mission is to promote the well-being of society by teaching the science of Krishna 
                  consciousness according to Bhagavad-gita and other ancient scriptures. Our core principles include:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>To systematically propagate spiritual knowledge to society at large</li>
                  <li>To bring the members closer together for the purpose of teaching a simpler and more natural way of life</li>
                  <li>To educate all people in the techniques of spiritual life in order to check the imbalance of values in life</li>
                  <li>To propagate a consciousness of Krishna as it is revealed in the Bhagavad-gita and Srimad Bhagavatam</li>
                </ul>
                
                <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mt-12 mb-4">Temple Architecture</h3>
                <p>
                  The ISKCON Lucknow temple is a beautiful example of traditional Vedic architecture blended with modern 
                  construction techniques. The temple's design represents the spiritual cosmos, with its spires reaching 
                  toward the heavens and its sanctum representing the center of the universe.
                </p>
                <p>
                  The temple features intricate carvings, vibrant paintings depicting scenes from Krishna's pastimes, and 
                  ornate altars that house the deities. The main prayer hall can accommodate hundreds of devotees, making it 
                  suitable for large gatherings during festivals and special events.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-devotional text-xl text-krishna-blue mb-4">Founder Acharya</h3>
                  <div className="flex flex-col items-center mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1562157937-6935df0ddedc?q=80&w=1035&auto=format&fit=crop" 
                      alt="Srila Prabhupada" 
                      className="w-48 h-48 rounded-full object-cover mb-4 border-4 border-krishna-gold"
                    />
                    <h4 className="font-devotional text-lg font-semibold">His Divine Grace A.C. Bhaktivedanta Swami Prabhupada</h4>
                    <p className="text-sm text-muted-foreground text-center">Founder-Acharya of the International Society for Krishna Consciousness</p>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="font-devotional text-xl text-krishna-blue mb-4">Four Principles</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">1</div>
                      <span>Mercy - No meat eating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">2</div>
                      <span>Cleanliness - No illicit sex</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">3</div>
                      <span>Austerity - No gambling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-krishna-gold text-white flex items-center justify-center shrink-0 mt-0.5">4</div>
                      <span>Truthfulness - No intoxication</span>
                    </li>
                  </ul>
                  
                  <Separator className="my-6" />
                  
                  <h3 className="font-devotional text-xl text-krishna-blue mb-4">Temple Activities</h3>
                  <ul className="space-y-3">
                    <li>Daily Worship & Aartis</li>
                    <li>Bhagavad Gita Classes</li>
                    <li>Sunday Feast Programs</li>
                    <li>Youth Programs & Camps</li>
                    <li>Food Distribution (Prasadam)</li>
                    <li>Festival Celebrations</li>
                    <li>Cultural Performances</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
