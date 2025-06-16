
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks/usePermissions';
import { EventForm } from './events/EventForm';
import { EventList } from './events/EventList';

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const permissions = usePermissions();

  const emptyEvent = {
    title: '',
    date: '',
    time: '',
    description: '',
    full_description: '',
    image: '',
    location: '',
    highlights: [],
    scheduled_publish: null,
    is_published: true,
    send_notification: false
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

  const sendNotification = async (event: any) => {
    if (!permissions.canSendNotifications) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to send notifications",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('send-event-notification', {
        body: { event }
      });

      if (error) throw error;
      
      toast({ title: "Notification sent successfully!" });
    } catch (error: any) {
      toast({
        title: "Error sending notification",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSave = async (eventData: any) => {
    if (!eventData.id && !permissions.canCreateEvents) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to create events",
        variant: "destructive"
      });
      return;
    }

    if (eventData.id && !permissions.canEditEvents) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to edit events",
        variant: "destructive"
      });
      return;
    }

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
        highlights,
        scheduled_publish: eventData.scheduled_publish || null,
        is_published: eventData.is_published
      };

      if (eventData.id) {
        const { error } = await supabase
          .from('events')
          .update(saveData)
          .eq('id', eventData.id);
        if (error) throw error;
        toast({ title: "Event updated successfully!" });
      } else {
        const { data, error } = await supabase
          .from('events')
          .insert([saveData])
          .select()
          .single();
        if (error) throw error;
        
        toast({ title: "Event created successfully!" });
        
        if (eventData.send_notification && eventData.is_published) {
          await sendNotification(data);
        }
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
    if (!permissions.canDeleteEvents) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to delete events",
        variant: "destructive"
      });
      return;
    }

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

  if (loading) {
    return <div className="text-center py-8">Loading events...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        {permissions.canCreateEvents && (
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-krishna-gold hover:bg-krishna-saffron"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        )}
      </div>

      {isCreating && permissions.canCreateEvents && (
        <EventForm
          event={emptyEvent}
          onSave={handleSave}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingEvent && permissions.canEditEvents && (
        <EventForm
          event={editingEvent}
          onSave={handleSave}
          onCancel={() => setEditingEvent(null)}
        />
      )}

      <EventList
        events={events}
        onEdit={setEditingEvent}
        onDelete={handleDelete}
        onSendNotification={sendNotification}
        permissions={{
          canEditEvents: permissions.canEditEvents,
          canDeleteEvents: permissions.canDeleteEvents,
          canSendNotifications: permissions.canSendNotifications
        }}
      />
    </div>
  );
};

export default AdminEvents;
