
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Sun } from 'lucide-react';

const scheduleItems = [
  {
    name: "Mangala Aarti",
    time: "4:30 AM - 5:00 AM"
  },
  {
    name: "Shringar Darshan",
    time: "7:15 AM - 7:45 AM"
  },
  {
    name: "Guru Puja",
    time: "7:45 AM - 8:15 AM"
  },
  {
    name: "Bhagavatam Class",
    time: "8:15 AM - 9:30 AM"
  },
  {
    name: "Raj Bhog Darshan",
    time: "12:00 PM - 12:30 PM"
  },
  {
    name: "Temple Closes",
    time: "12:30 PM - 4:00 PM"
  },
  {
    name: "Darshan Opens",
    time: "4:00 PM - 7:00 PM"
  },
  {
    name: "Sandhya Aarti",
    time: "7:00 PM - 7:30 PM"
  },
  {
    name: "Shayana Aarti",
    time: "8:30 PM - 9:00 PM"
  }
];

const DarshanSchedule = () => {
  return (
    <Card className="decorative-border">
      <CardHeader className="bg-krishna-gold/10">
        <CardTitle className="font-devotional text-2xl flex items-center gap-2 text-krishna-blue">
          <Clock className="text-krishna-gold" />
          Daily Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div 
              key={index}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-krishna-gold" />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DarshanSchedule;
