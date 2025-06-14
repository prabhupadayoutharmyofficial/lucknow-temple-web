
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Sun } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ScheduleItem {
  id: string;
  day_of_week: string;
  morning_time: string | null;
  evening_time: string | null;
  special_notes: string | null;
}

const DarshanSchedule = () => {
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from('darshan_schedule')
        .select('*')
        .order('day_of_week');

      if (error) throw error;
      setSchedule(data || []);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="decorative-border">
        <CardHeader className="bg-krishna-gold/10">
          <CardTitle className="font-devotional text-2xl flex items-center gap-2 text-krishna-blue">
            <Clock className="text-krishna-gold" />
            Daily Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-4">Loading schedule...</div>
        </CardContent>
      </Card>
    );
  }

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
          {schedule.map((item) => (
            <div 
              key={item.id}
              className="flex justify-between items-center py-3 border-b last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-krishna-gold" />
                <span className="font-medium capitalize">{item.day_of_week}</span>
              </div>
              <div className="text-right">
                {item.morning_time && (
                  <div className="text-sm text-muted-foreground">
                    Morning: {item.morning_time}
                  </div>
                )}
                {item.evening_time && (
                  <div className="text-sm text-muted-foreground">
                    Evening: {item.evening_time}
                  </div>
                )}
                {item.special_notes && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.special_notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DarshanSchedule;
