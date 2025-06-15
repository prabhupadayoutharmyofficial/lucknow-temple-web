
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DarshanSchedule from '@/components/DarshanSchedule';
import DarshanHero from '@/components/darshan/DarshanHero';
import WeeklyPrograms from '@/components/darshan/WeeklyPrograms';
import FestivalCalendarDisplay from '@/components/darshan/FestivalCalendarDisplay';
import VisitorGuidelines from '@/components/darshan/VisitorGuidelines';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from 'lucide-react';

const Darshan = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <DarshanHero />
        
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
                  <WeeklyPrograms />
                </TabsContent>
                
                <TabsContent value="festival-calendar" className="pt-6">
                  <FestivalCalendarDisplay />
                </TabsContent>
              </Tabs>
            </div>
            
            <VisitorGuidelines />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Darshan;
