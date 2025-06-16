import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, Save, X, Upload, Send, Calendar as CalendarIcon, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePermissions } from '@/hooks/usePermissions';

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
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

  const uploadImage = async (file: File) => {
    if (!file) return null;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('events')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingImage(false);
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
        
        // Send notification if requested
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

  const EventForm = ({ event, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState({
      ...event,
      highlights_text: event.highlights ? event.highlights.join('\n') : ''
    });
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setUploadSuccess(false);
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setFormData({ ...formData, image: imageUrl });
          setUploadSuccess(true);
          // Reset success indicator after 3 seconds
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      }
    };
    
    const handleUploadButtonClick = () => {
      fileInputRef.current?.click();
    }

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
                type="date"
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
            <Label htmlFor="image">Event Image</Label>
            <div className="space-y-2">
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Image URL or upload below"
              />
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleUploadButtonClick}
                  disabled={uploadingImage}
                  className={uploadSuccess ? "border-green-500 bg-green-50" : ""}
                >
                  {uploadingImage ? (
                    <>
                      <Upload className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : uploadSuccess ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Uploaded!
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-md border"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="scheduled_publish">Scheduled Publish Date</Label>
              <Input
                id="scheduled_publish"
                type="datetime-local"
                value={formData.scheduled_publish || ''}
                onChange={(e) => setFormData({ ...formData, scheduled_publish: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published">Publish immediately</Label>
              </div>
              {!event.id && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="send_notification"
                    checked={formData.send_notification}
                    onCheckedChange={(checked) => setFormData({ ...formData, send_notification: checked })}
                  />
                  <Label htmlFor="send_notification">Send email notification</Label>
                </div>
              )}
            </div>
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

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {event.title}
                    {!event.is_published && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Draft</span>
                    )}
                    {event.scheduled_publish && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        Scheduled
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>{event.date} • {event.time}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {permissions.canSendNotifications && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendNotification(event)}
                      disabled={!event.is_published}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  )}
                  {permissions.canEditEvents && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingEvent(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                  {permissions.canDeleteEvents && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              {event.location && (
                <p className="text-sm mt-2"><strong>Location:</strong> {event.location}</p>
              )}
              {event.scheduled_publish && (
                <p className="text-sm mt-2"><strong>Scheduled for:</strong> {new Date(event.scheduled_publish).toLocaleString()}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminEvents;
