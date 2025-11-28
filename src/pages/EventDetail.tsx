
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PhotoGallery from '@/components/PhotoGallery';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  const fetchEvent = async (eventId: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      setEvent(data);

      // Fetch event media
      const { data: mediaData } = await supabase
        .from('event_media')
        .select('*')
        .eq('event_id', eventId)
        .order('display_order');

      setMedia(mediaData || []);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-krishna-blue mx-auto"></div>
            <p className="mt-4">Loading event...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event not found</h1>
            <Link to="/events">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          {event.image.match(/\.(mp4|webm|ogg)$/i) || event.image.includes('gallery-videos') ? (
            <video 
              src={event.image} 
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="font-devotional text-4xl md:text-5xl font-bold mb-4">
                {event.title}
              </h1>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{event.time}</span>
                </div>
                {event.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/events" className="inline-flex items-center gap-2 text-krishna-blue hover:text-krishna-gold mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Events
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-6">About This Event</h2>
                  <p className="text-lg leading-relaxed mb-8 text-gray-700">
                    {event.full_description || event.description}
                  </p>

                  {media.length > 0 && (
                    <div className="mt-12">
                      <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
                      <PhotoGallery 
                        photos={media.map((m, idx) => ({
                          id: idx,
                          url: m.url,
                          alt: `${event.title} - Media ${idx + 1}`,
                          media_type: m.media_type
                        }))} 
                      />
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                    {event.highlights && event.highlights.length > 0 && (
                      <>
                        <h3 className="text-xl font-bold mb-4 text-krishna-blue">Event Highlights</h3>
                        <ul className="space-y-2 mb-6">
                          {event.highlights.map((highlight: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-krishna-gold">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    <div className="pt-6 border-t">
                      <h4 className="font-semibold mb-3">Event Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-krishna-gold" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-krishna-gold" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-krishna-gold" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
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

export default EventDetail;
