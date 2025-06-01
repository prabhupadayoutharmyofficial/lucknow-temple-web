
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Bus, Car, Train, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Visit = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1573494907507-b5e77e59c1cc?q=80&w=2070&auto=format&fit=crop')",
          }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">Visit Our Temple</h1>
            <p className="text-xl max-w-3xl mx-auto">Plan your visit to ISKCON Lucknow</p>
          </div>
        </div>
        
        {/* Visit Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-6">Temple Location</h2>
                <div className="rounded-lg overflow-hidden shadow-lg h-[400px] border mb-6">
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
                <div className="flex gap-2 mb-2">
                  <MapPin className="text-krishna-gold shrink-0 mt-1" />
                  <p className="text-lg">
                    ISKCON Temple, Aliganj, Lucknow, Uttar Pradesh, India
                  </p>
                </div>
                <Button 
                  className="bg-krishna-blue hover:bg-krishna-blue/80 text-white flex gap-2"
                  onClick={() => window.open('https://maps.app.goo.gl/w4ScCjeGWWuQ2TpS8', '_blank')}
                >
                  <MapPin size={16} />
                  Get Directions
                </Button>
              </div>
              
              <div>
                <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-6">How to Reach</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-3 items-center mb-4">
                        <div className="bg-krishna-gold/10 p-2 rounded-full">
                          <Car className="text-krishna-blue" size={24} />
                        </div>
                        <h3 className="text-xl font-medium">By Car</h3>
                      </div>
                      <p className="text-muted-foreground">
                        The temple is located in Aliganj area. Use GPS navigation or follow signs to ISKCON Temple. Parking available on premise.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-3 items-center mb-4">
                        <div className="bg-krishna-gold/10 p-2 rounded-full">
                          <Bus className="text-krishna-blue" size={24} />
                        </div>
                        <h3 className="text-xl font-medium">By Bus</h3>
                      </div>
                      <p className="text-muted-foreground">
                        Take city bus routes 15, 33, or 45 to Aliganj Market stop. The temple is a 5-minute walk from there.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-3 items-center mb-4">
                        <div className="bg-krishna-gold/10 p-2 rounded-full">
                          <Train className="text-krishna-blue" size={24} />
                        </div>
                        <h3 className="text-xl font-medium">By Train</h3>
                      </div>
                      <p className="text-muted-foreground">
                        From Lucknow Railway Station, take an auto-rickshaw or taxi directly to the temple (approx. 25 minutes).
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex gap-3 items-center mb-4">
                        <div className="bg-krishna-gold/10 p-2 rounded-full">
                          <Clock className="text-krishna-blue" size={24} />
                        </div>
                        <h3 className="text-xl font-medium">Visiting Hours</h3>
                      </div>
                      <p className="text-muted-foreground">
                        The temple is open daily from 4:30 AM to 12:30 PM and 4:00 PM to 9:00 PM. Closed between 12:30 PM to 4:00 PM.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <Card className="decorative-border overflow-hidden">
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
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-krishna-blue/10 border-krishna-gold">
                <CardContent className="p-6">
                  <h3 className="font-devotional text-xl text-krishna-blue mb-4">Special Programs</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Sunday Feast Program</h4>
                      <p className="text-sm text-muted-foreground">5:30 PM - 8:30 PM</p>
                      <p className="text-sm">Bhajan, Kirtan, Lecture and Prasadam</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Tuesday Bhagavad Gita Class</h4>
                      <p className="text-sm text-muted-foreground">6:00 PM - 7:30 PM</p>
                      <p className="text-sm">Discourse on Bhagavad Gita followed by Prasadam</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Friday Bhajan Night</h4>
                      <p className="text-sm text-muted-foreground">7:00 PM - 9:00 PM</p>
                      <p className="text-sm">Devotional singing and chanting</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button className="w-full bg-krishna-gold hover:bg-krishna-saffron text-white" asChild>
                <a href="/darshan">View Complete Schedule</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Visit;
