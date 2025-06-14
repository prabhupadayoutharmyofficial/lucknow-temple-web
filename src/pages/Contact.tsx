
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import TempleInfo from '@/components/TempleInfo';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Share2, HelpCircle } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('')"
          }}>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto">Get in touch with ISKCON Lucknow Temple</p>
          </div>
        </div>
        
        {/* Contact Content */}
        <section className="lotus-pattern py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-devotional text-3xl font-semibold text-krishna-blue mb-8 flex items-center gap-3">
                  <MessageSquare className="text-krishna-gold" />
                  Get in Touch
                </h2>
                <p className="text-lg mb-8">
                  Have a question about our temple services, events, or programs? 
                  Want to volunteer or donate? Please fill out the form and our team 
                  will get back to you as soon as possible.
                </p>
                
                <ContactForm />
              </div>
              
              <div className="space-y-8">
                <TempleInfo className="mb-8" />
                
                <div className="h-[400px] rounded-lg overflow-hidden shadow-lg border">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224.84260949593925!2d80.9299473765118!3d26.894240676697178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd7dfed76d05%3A0x826a93fc6b6c57b2!2sISKCON%20Lucknow%20Vrindavan%20Dham%20-%20International%20Society%20for%20Krishna%20Consciousness!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="ISKCON Lucknow Map"
                  ></iframe>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-krishna-gold/10 flex items-center justify-center">
                          <Share2 className="text-krishna-gold" size={20} />
                        </div>
                        <h3 className="font-medium">Connect With Us</h3>
                      </div>
                      <div className="space-y-3">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-krishna-gold transition-colors">
                          <span className="w-8">FB:</span> ISKCONLucknow
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-krishna-gold transition-colors">
                          <span className="w-8">IG:</span> @iskcon_lucknow
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-krishna-gold transition-colors">
                          <span className="w-8">YT:</span> ISKCON Lucknow Official
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-krishna-gold/10 flex items-center justify-center">
                          <HelpCircle className="text-krishna-gold" size={20} />
                        </div>
                        <h3 className="font-medium">Frequently Asked</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>• Can I bring outside food to the temple?</p>
                        <p>• How can I volunteer at the temple?</p>
                        <p>• What are the rules for temple visits?</p>
                        <p>• How can I become a member?</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
