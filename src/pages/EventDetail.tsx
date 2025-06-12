
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowLeft, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Janmashtami Celebration',
    date: 'August 15, 2025',
    time: '5:00 PM - 12:00 AM',
    description: 'Join us for the grand celebration of Lord Krishna\'s appearance day with kirtan, abhishek, drama, and midnight aarti.',
    image: '/public/janmashtami.jpg',
    fullDescription: 'Janmashtami is one of the most important festivals in the Krishna consciousness movement. The celebration begins in the evening with elaborate abhishek ceremonies where the deity of Krishna is bathed with milk, yogurt, honey, and other auspicious items. Throughout the evening, devotees engage in melodious kirtan, dramatic presentations depicting Krishna\'s pastimes, and spiritual discourses. The highlight of the celebration is the midnight aarti when Krishna appeared in this world. The festival concludes with a magnificent feast of Krishna prasadam.',
    location: 'Main Temple Hall',
    highlights: [
      'Grand Abhishek Ceremony',
      'Melodious Kirtan and Bhajans',
      'Krishna Lila Drama Presentations',
      'Midnight Aarti Celebration',
      'Special Prasadam Feast'
    ]
  },
  {
    id: 2,
    title: 'Gita Jayanti',
    date: 'December 2, 2025',
    time: '10:00 AM - 2:00 PM',
    description: 'Celebrate the day when Bhagavad Gita was spoken by Lord Krishna to Arjuna. Special discourse and havan ceremony.',
    image: '/public/geetajayanti.jpeg',
    fullDescription: 'Gita Jayanti commemorates the day when Lord Krishna spoke the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. This sacred day is celebrated with special readings from the Gita, philosophical discourses explaining its timeless wisdom, and a grand fire sacrifice (havan) for world peace and prosperity. Devotees gather to hear the eternal teachings that guide humanity towards spiritual enlightenment.',
    location: 'Temple Courtyard',
    highlights: [
      'Bhagavad Gita Recitation',
      'Spiritual Discourse by Senior Devotees',
      'Grand Havan Ceremony',
      'Distribution of Gita Books',
      'Community Feast'
    ]
  },
  {
    id: 3,
    title: 'Daily Feast Program',
    date: 'Everyday',
    time: '6:30 PM - 8:30 PM',
    description: 'Daily spiritual program featuring bhajan, discourse, arati, and free prasadam (sanctified vegetarian meal).',
    image: '/public/prasadam.jpg',
    fullDescription: 'Our daily evening program is the heart of temple life. Every day, devotees and visitors gather for a complete spiritual experience that nourishes both the soul and body. The program begins with devotional singing (bhajans), followed by enlightening spiritual discourse, the evening aarti ceremony, and concludes with the distribution of sanctified vegetarian food (prasadam). This daily gathering creates a sense of spiritual community and provides regular spiritual nourishment.',
    location: 'Main Temple Hall',
    highlights: [
      'Daily Bhajan and Kirtan',
      'Spiritual Discourse',
      'Evening Aarti Ceremony',
      'Free Sanctified Meal',
      'Community Fellowship'
    ]
  },
  {
    id: 4,
    title: 'Annadaan Festival',
    date: 'March 20, 2025',
    time: '11:00 AM - 4:00 PM',
    description: 'Sacred food distribution program where devotees offer and distribute free meals to all visitors as a form of seva.',
    image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?q=80&w=1970&auto=format&fit=crop',
    fullDescription: 'Annadaan, the sacred act of food distribution, is considered one of the highest forms of service in Vedic culture. During this special festival, devotees prepare and distribute thousands of meals to visitors from all walks of life. The event promotes the principle that no one should go hungry and demonstrates the temple\'s commitment to serving the community. The food is prepared with love and devotion, making it not just nourishment for the body but also spiritual sustenance.',
    location: 'Temple Grounds',
    highlights: [
      'Mass Food Preparation',
      'Community Service Activities',
      'Cultural Performances',
      'Spiritual Talks on Service',
      'Distribution to Needy'
    ]
  },
  {
    id: 5,
    title: 'Jagannath Rath Yatra',
    date: 'July 7, 2025',
    time: '9:00 AM - 6:00 PM',
    description: 'Grand chariot festival celebrating Lord Jagannath with colorful procession, cultural programs, and prasadam distribution.',
    image: 'https://images.unsplash.com/photo-1623345805815-587eac999465?q=80&w=1970&auto=format&fit=crop',
    fullDescription: 'The Jagannath Rath Yatra is a magnificent chariot festival that recreates the ancient tradition of Puri, where Lord Jagannath travels to meet His devotees. The festival features beautifully decorated chariots carrying the deities through the streets, accompanied by thousands of devotees singing and dancing. The procession is a spectacular display of devotion, culture, and community spirit, culminating in special ceremonies and a grand feast.',
    location: 'Starting from Temple to City Center',
    highlights: [
      'Decorated Chariot Procession',
      'Street Kirtan and Dancing',
      'Cultural Performances',
      'Community Participation',
      'Grand Feast Distribution'
    ]
  },
  {
    id: 6,
    title: 'Diwali Celebration',
    date: 'November 1, 2025',
    time: '6:00 PM - 10:00 PM',
    description: 'Festival of lights celebration with special arti, lamp lighting ceremony, cultural programs, and festive prasadam.',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1970&auto=format&fit=crop',
    fullDescription: 'Diwali, the festival of lights, symbolizes the victory of light over darkness and good over evil. The temple celebration features the lighting of hundreds of oil lamps, creating a divine atmosphere of illumination. Special prayers are offered for prosperity and spiritual advancement, cultural programs showcase traditional arts, and the evening concludes with the distribution of special sweets and savories prepared for the occasion.',
    location: 'Entire Temple Complex',
    highlights: [
      'Lamp Lighting Ceremony',
      'Special Diwali Aarti',
      'Cultural Dance Performances',
      'Traditional Music Programs',
      'Special Sweets Distribution'
    ]
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find(e => e.id === parseInt(id || ''));

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
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
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
                    {event.fullDescription}
                  </p>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
                    <h3 className="text-xl font-bold mb-4 text-krishna-blue">Event Highlights</h3>
                    <ul className="space-y-2">
                      {event.highlights?.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-krishna-gold">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6 pt-6 border-t">
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
