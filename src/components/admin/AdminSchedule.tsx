
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSchedule = () => {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
    } catch (error: any) {
      toast({
        title: "Error fetching schedule",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingDay(item.id);
    setEditValues({
      morning_time: item.morning_time,
      evening_time: item.evening_time,
      special_notes: item.special_notes
    });
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from('darshan_schedule')
        .update({
          morning_time: editValues.morning_time,
          evening_time: editValues.evening_time,
          special_notes: editValues.special_notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Schedule updated successfully!" });
      setEditingDay(null);
      fetchSchedule();
    } catch (error: any) {
      toast({
        title: "Error updating schedule",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingDay(null);
    setEditValues({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading schedule...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Darshan Schedule</h2>
      
      <div className="grid gap-4">
        {schedule.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg capitalize">{item.day_of_week}</CardTitle>
                <div className="flex gap-2">
                  {editingDay === item.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSave(item.id)}
                        className="bg-krishna-blue hover:bg-krishna-blue/80"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingDay === item.id ? (
                <>
                  <div>
                    <Label htmlFor={`morning-${item.id}`}>Morning Time</Label>
                    <Input
                      id={`morning-${item.id}`}
                      value={editValues.morning_time}
                      onChange={(e) => setEditValues({
                        ...editValues,
                        morning_time: e.target.value
                      })}
                      placeholder="e.g., 4:30 AM - 12:30 PM"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`evening-${item.id}`}>Evening Time</Label>
                    <Input
                      id={`evening-${item.id}`}
                      value={editValues.evening_time}
                      onChange={(e) => setEditValues({
                        ...editValues,
                        evening_time: e.target.value
                      })}
                      placeholder="e.g., 4:00 PM - 8:30 PM"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`notes-${item.id}`}>Special Notes</Label>
                    <Textarea
                      id={`notes-${item.id}`}
                      value={editValues.special_notes}
                      onChange={(e) => setEditValues({
                        ...editValues,
                        special_notes: e.target.value
                      })}
                      rows={2}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Morning:</strong> {item.morning_time || 'Not set'}
                    </div>
                    <div>
                      <strong>Evening:</strong> {item.evening_time || 'Not set'}
                    </div>
                  </div>
                  {item.special_notes && (
                    <div>
                      <strong>Notes:</strong> {item.special_notes}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminSchedule;
