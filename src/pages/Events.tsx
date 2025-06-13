
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-krishna-blue text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-8 w-8" />
              <h1 className="font-devotional text-3xl md:text-4xl">Temple Events</h1>
            </div>
            <p className="text-lg max-w-2xl">
              Join us for spiritual celebrations, festivals, and regular programs throughout the year.
            </p>
          </div>
        </div>

        {/* Events Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-krishna-blue mx-auto"></div>
                <p className="mt-4">Loading events...</p>
              </div>
            ) : events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.description}
                    image={event.image}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Available</h3>
                <p className="text-gray-500">Check back later for upcoming temple events and celebrations.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
