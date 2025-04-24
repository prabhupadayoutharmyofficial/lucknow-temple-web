
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';
import { Calendar } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Janmashtami Celebration',
    date: 'August 15, 2025',
    time: '5:00 PM - 12:00 AM',
    description: 'Join us for the grand celebration of Lord Krishna\'s appearance day with kirtan, abhishek, drama, and midnight aarti.',
    image: 'https://images.unsplash.com/photo-1617840213429-301c23a0c930?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Gita Jayanti',
    date: 'December 2, 2025',
    time: '10:00 AM - 2:00 PM',
    description: 'Celebrate the day when Bhagavad Gita was spoken by Lord Krishna to Arjuna. Special discourse and havan ceremony.',
    image: 'https://images.unsplash.com/photo-1600197155673-c2f7c9a36559?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Sunday Feast Program',
    date: 'Every Sunday',
    time: '5:30 PM - 8:30 PM',
    description: 'Weekly spiritual program featuring bhajan, discourse, arati, and free prasadam (sanctified vegetarian meal).',
    image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Gaura Purnima Festival',
    date: 'March 14, 2025',
    time: '4:00 PM - 9:00 PM',
    description: 'Celebration of Lord Chaitanya\'s appearance with special abhishek, kirtan, and feast.',
    image: 'https://images.unsplash.com/photo-1623345805815-587eac999465?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Rama Navami',
    date: 'April 17, 2025',
    time: '10:00 AM - 8:00 PM',
    description: 'Celebration of Lord Rama\'s appearance day with special puja and cultural program.',
    image: 'https://images.unsplash.com/photo-1623345805815-587eac999465?q=80&w=1970&auto=format&fit=crop'
  }
];

const Events = () => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </main>

      <Footer />
    </div>
  );
};

export default Events;
