
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
}

const EventCard: React.FC<EventCardProps> = ({ id, title, date, time, description, image }) => {
  return (
    <Link to={`/events/${id}`} className="block h-full">
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col cursor-pointer">
        <div className="h-48 overflow-hidden bg-muted flex items-center justify-center">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
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
          <span className="text-primary hover:text-krishna-gold transition-colors">
            Read more →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
