
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
    title: 'Sunday Feast Program',
    date: 'Every Sunday',
    time: '5:30 PM - 8:30 PM',
    description: 'Weekly spiritual program featuring bhajan, discourse, arati, and free prasadam (sanctified vegetarian meal).',
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
  },
  {
    id: 7,
    title: 'Gaura Purnima Festival',
    date: 'March 14, 2025',
    time: '4:00 PM - 9:00 PM',
    description: 'Celebration of Lord Chaitanya\'s appearance with special abhishek, kirtan, and feast.',
    image: 'https://images.unsplash.com/photo-1623345805815-587eac999465?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: 8,
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
                  id={event.id}
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
