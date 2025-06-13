
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const FeaturedEvents = () => {
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
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="lotus-pattern py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="lotus-pattern py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-devotional text-3xl font-semibold text-krishna-blue">
            Upcoming Events
          </h2>
          <Link to="/events">
            <Button variant="outline" className="border-krishna-gold text-krishna-gold hover:bg-krishna-gold hover:text-white mt-4 md:mt-0">
              View All Events <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
        
        {events.length > 0 ? (
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {events.map((event) => (
                <CarouselItem key={event.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <EventCard
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.description}
                    image={event.image}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No events available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedEvents;
