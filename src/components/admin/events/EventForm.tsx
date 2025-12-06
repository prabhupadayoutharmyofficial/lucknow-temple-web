
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { EventMediaUpload } from './EventMediaUpload';

interface EventFormProps {
  event: any;
  onSave: (eventData: any) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    ...event,
    highlights_text: Array.isArray(event.highlights) ? event.highlights.join('\n') : '',
    image: event.image || '',
    title: event.title || '',
    date: event.date || '',
    time: event.time || '',
    description: event.description || '',
    full_description: event.full_description || '',
    location: event.location || '',
    is_published: event.is_published !== undefined ? event.is_published : true,
    scheduled_publish: event.scheduled_publish || '',
    send_notification: event.send_notification || false
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{event.id ? 'Edit Event' : 'Create New Event'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[80vh] overflow-y-auto">
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
        
        <ImageUpload
          imageUrl={formData.image}
          onImageChange={(url) => setFormData({ ...formData, image: url })}
        />

        <EventMediaUpload 
          eventId={event.id}
        />
        
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
