
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DarshanSchedule from '@/components/DarshanSchedule';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Info } from 'lucide-react';

const festivals = [
  {
    month: "January",
    events: [
      { name: "Vaikuntha Ekadashi", date: "January 2, 2025" },
      { name: "Putrada Ekadashi", date: "January 16, 2025" }
    ]
  },
  {
    month: "February",
    events: [
      { name: "Vasant Panchami", date: "February 4, 2025" },
      { name: "Nityananda Trayodashi", date: "February 12, 2025" }
    ]
  },
  {
    month: "March",
    events: [
      { name: "Gaura Purnima", date: "March 14, 2025" },
      { name: "Ram Navami", date: "March 30, 2025" }
    ]
  },
  {
    month: "April",
    events: [
      { name: "Narsimha Chaturdasi", date: "April 23, 2025" }
    ]
  },
  {
    month: "May",
    events: [
      { name: "Panihati Cida Dahi Festival", date: "May 10, 2025" }
    ]
  },
  {
    month: "June",
    events: [
      { name: "Ratha Yatra", date: "June 29, 2025" }
    ]
  },
  {
    month: "July",
    events: [
      { name: "Guru Purnima", date: "July 12, 2025" }
    ]
  },
  {
    month: "August",
    events: [
      { name: "Janmashtami", date: "August 15, 2025" },
      { name: "Srila Prabhupada's Appearance Day", date: "August 29, 2025" }
    ]
  },
  {
    month: "September",
    events: [
      { name: "Radhastami", date: "September 5, 2025" }
    ]
  },
  {
    month: "October",
    events: [
      { name: "Kartik Month Begins", date: "October 15, 2025" },
      { name: "Govardhan Puja", date: "October 31, 2025" }
    ]
  },
  {
    month: "November",
    events: [
      { name: "Tulasi-Saligram Vivaha", date: "November 11, 2025" }
    ]
  },
  {
    month: "December",
    events: [
      { name: "Gita Jayanti", date: "December 2, 2025" }
    ]
  }
];

const Darshan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[50vh] bg-cover bg-center flex items-center justify-center" 
          style={{ 
            backgroundImage: "url('')"
          }}>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative text-center text-white z-10">
            <h1 className="font-devotional text-5xl font-bold mb-4">Temple Schedule</h1>
            <p className="text-xl max-w-3xl mx-auto">Darshan timings, aarti schedule, and festival calendar</p>
          </div>
        </div>
        
        {/* Schedule Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="daily-schedule" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="daily-schedule" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Daily Schedule
                  </TabsTrigger>
                  <TabsTrigger value="festival-calendar" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Festival Calendar
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="daily-schedule" className="pt-6">
                  <DarshanSchedule />
                  
                  <div className="mt-8">
                    <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mb-4">Special Weekly Programs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-center">Sunday</h4>
                          <p className="text-sm text-center text-muted-foreground">Special Feast Program</p>
                          <p className="text-sm text-center">5:30 PM - 8:30 PM</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-center">Tuesday</h4>
                          <p className="text-sm text-center text-muted-foreground">Bhagavad Gita Class</p>
                          <p className="text-sm text-center">6:00 PM - 7:30 PM</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-medium text-center">Friday</h4>
                          <p className="text-sm text-center text-muted-foreground">Bhajan Night</p>
                          <p className="text-sm text-center">7:00 PM - 9:00 PM</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="festival-calendar" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {festivals.map((month) => (
                      <Card key={month.month}>
                        <CardContent className="p-4">
                          <h4 className="font-medium border-b pb-2 mb-3">{month.month}</h4>
                          <ul className="space-y-2">
                            {month.events.map((event, index) => (
                              <li key={index} className="text-sm">
                                <span className="text-krishna-gold font-semibold">{event.date}</span>
                                <p>{event.name}</p>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1">
              <Card className="mb-8 decorative-border overflow-hidden">
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
                    
                    <h4 className="font-medium pt-2">Prasadam (Sacred Food)</h4>
                    <p className="text-sm">
                      The temple serves prasadam (sanctified vegetarian food) to all visitors. Donations for prasadam are welcome but not mandatory.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="decorative-border">
                <CardContent className="p-6">
                  <h3 className="font-devotional text-xl text-krishna-blue mb-4">Special Instructions</h3>
                  <p className="text-sm mb-4">
                    Ekadashi (11th day of lunar cycle) is observed with fasting from grains and beans. Temple kitchen serves special Ekadashi prasadam on these days.
                  </p>
                  <p className="text-sm">
                    During major festivals, special schedules are followed. Please check the temple notice board or contact the temple office for festival details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Darshan;
