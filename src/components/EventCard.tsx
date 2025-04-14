
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, date, time, description, image }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-devotional text-xl text-krishna-blue">{title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar size={16} className="text-krishna-gold" />
          <span>{date} • {time}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button variant="ghost" className="hover:text-krishna-gold hover:bg-transparent p-0 h-auto">
          Read more →
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
