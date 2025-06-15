
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  month: string;
  description?: string;
}

const FestivalCalendarDisplay = () => {
  const [festivals, setFestivals] = useState<{ [key: string]: FestivalEvent[] }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFestivals();
  }, []);

  const fetchFestivals = async () => {
    try {
      const { data, error } = await supabase
        .from('festival_calendar')
        .select('*')
        .order('date');

      if (error) throw error;
      
      // Group festivals by month
      const festivalData = (data as any[])?.map(item => ({
        id: item.id,
        name: item.name,
        date: item.date,
        month: item.month,
        description: item.description
      })) || [];
      
      const groupedFestivals = festivalData.reduce((acc: { [key: string]: FestivalEvent[] }, festival: FestivalEvent) => {
        if (!acc[festival.month]) {
          acc[festival.month] = [];
        }
        acc[festival.month].push(festival);
        return acc;
      }, {});
      
      setFestivals(groupedFestivals);
    } catch (error) {
      console.error('Error fetching festivals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading festival calendar...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(festivals).map(([month, events]) => (
        <Card key={month}>
          <CardContent className="p-4">
            <h4 className="font-medium border-b pb-2 mb-3">{month}</h4>
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="text-sm">
                  <span className="text-krishna-gold font-semibold">{event.date}</span>
                  <p>{event.name}</p>
                  {event.description && (
                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FestivalCalendarDisplay;
