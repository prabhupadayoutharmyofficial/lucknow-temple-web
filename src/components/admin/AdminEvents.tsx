
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const emptyEvent = {
    title: '',
    date: '',
    time: '',
    description: '',
    full_description: '',
    image: '',
    location: '',
    highlights: []
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching events",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (eventData: any) => {
    try {
      const highlights = eventData.highlights_text 
        ? eventData.highlights_text.split('\n').filter((h: string) => h.trim())
        : [];

      const saveData = {
        title: eventData.title,
        date: eventData.date,
        time: eventData.time,
        description: eventData.description,
        full_description: eventData.full_description,
        image: eventData.image,
        location: eventData.location,
        highlights
      };

      if (eventData.id) {
        const { error } = await supabase
          .from('events')
          .update(saveData)
          .eq('id', eventData.id);
        if (error) throw error;
        toast({ title: "Event updated successfully!" });
      } else {
        const { error } = await supabase
          .from('events')
          .insert([saveData]);
        if (error) throw error;
        toast({ title: "Event created successfully!" });
      }

      setEditingEvent(null);
      setIsCreating(false);
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error saving event",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Event deleted successfully!" });
      fetchEvents();
    } catch (error: any) {
      toast({
        title: "Error deleting event",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const EventForm = ({ event, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
      ...event,
      highlights_text: event.highlights ? event.highlights.join('\n') : ''
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle>{event.id ? 'Edit Event' : 'Create New Event'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          
          <div>
            <Label htmlFor="full_description">Full Description</Label>
            <Textarea
              id="full_description"
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              rows={4}
            />
          </div>
          
          <div>
            <Label htmlFor="highlights">Highlights (one per line)</Label>
            <Textarea
              id="highlights"
              value={formData.highlights_text}
              onChange={(e) => setFormData({ ...formData, highlights_text: e.target.value })}
              rows={4}
              placeholder="Enter each highlight on a new line"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => onSave(formData)} className="bg-krishna-blue hover:bg-krishna-blue/80">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={onCancel}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-krishna-gold hover:bg-krishna-saffron"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {isCreating && (
        <EventForm
          event={emptyEvent}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingEvent && (
        <EventForm
          event={editingEvent}
          onSave={handleSave}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.date} • {event.time}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEvent(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              {event.location && (
                <p className="text-sm mt-2"><strong>Location:</strong> {event.location}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
