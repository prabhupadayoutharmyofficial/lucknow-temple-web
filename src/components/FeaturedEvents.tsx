
import React from 'react';
import EventCard from './EventCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              description={event.description}
              image={event.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
