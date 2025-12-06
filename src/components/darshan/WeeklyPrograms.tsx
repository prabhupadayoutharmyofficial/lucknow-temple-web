
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const WeeklyPrograms = () => {
  const programs = [
    {
      day: "Sunday",
      title: "Special Feast Program",
      time: "5:30 PM - 8:30 PM"
    },
    {
      day: "Tuesday", 
      title: "Bhagavad Gita Class",
      time: "9:00 AM - 11:30 AM"
    },
    {
      day: "Friday",
      title: "Bhajan Night",
      time: "7:00 PM - 9:00 PM"
    }
  ];

  return (
    <div className="mt-8">
      <h3 className="font-devotional text-2xl font-semibold text-krishna-blue mb-4">Special Weekly Programs</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {programs.map((program) => (
          <Card key={program.day}>
            <CardContent className="p-4">
              <h4 className="font-medium text-center">{program.day}</h4>
              <p className="text-sm text-center text-muted-foreground">{program.title}</p>
              <p className="text-sm text-center">{program.time}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeeklyPrograms;
