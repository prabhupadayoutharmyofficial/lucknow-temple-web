
import React from 'react';
import EventCard from './EventCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const events = [
  {
    id: 1,
    title: 'Janmashtami Celebration',
    date: 'August 15, 2025',
    time: '5:00 PM - 12:00 AM',
    description: 'Join us for the grand celebration of Lord Krishna\'s appearance day with kirtan, abhishek, drama, and midnight aarti.',
    image: '/public/janmashtami.jpg'
  },
  {
    id: 2,
    title: 'Gita Jayanti',
    date: 'December 2, 2025',
    time: '10:00 AM - 2:00 PM',
    description: 'Celebrate the day when Bhagavad Gita was spoken by Lord Krishna to Arjuna. Special discourse and havan ceremony.',
    image: '/public/geetajayanti.jpeg'
  },
  {
    id: 3,
    title: 'Daily Feast Program',
    date: 'Everyday',
    time: '6:30 PM - 8:30 PM',
    description: 'Daily spiritual program featuring bhajan, discourse, arati, and free prasadam (sanctified vegetarian meal).',
    image: '/public/prasadam.jpg'
  },
  {
    id: 4,
    title: 'Annadaan Festival',
    date: 'March 20, 2025',
    time: '11:00 AM - 4:00 PM',
    description: 'Sacred food distribution program where devotees offer and distribute free meals to all visitors as a form of seva.',
    image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Jagannath Rath Yatra',
    date: 'July 7, 2025',
    time: '9:00 AM - 6:00 PM',
    description: 'Grand chariot festival celebrating Lord Jagannath with colorful procession, cultural programs, and prasadam distribution.',
    image: 'https://images.unsplash.com/photo-1623345805815-587eac999465?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Diwali Celebration',
    date: 'November 1, 2025',
    time: '6:00 PM - 10:00 PM',
    description: 'Festival of lights celebration with special arti, lamp lighting ceremony, cultural programs, and festive prasadam.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1970&auto=format&fit=crop'
  }
];

const FeaturedEvents = () => {
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
      </div>
    </section>
  );
};

export default FeaturedEvents;
