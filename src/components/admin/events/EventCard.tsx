
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Send, Calendar as CalendarIcon } from 'lucide-react';

interface EventCardProps {
  event: any;
  onEdit: (event: any) => void;
  onDelete: (id: string) => void;
  onSendNotification: (event: any) => void;
  permissions: {
    canEditEvents: boolean;
    canDeleteEvents: boolean;
    canSendNotifications: boolean;
  };
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onEdit, 
  onDelete, 
  onSendNotification, 
  permissions 
}) => {
  return (
    <Card>
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
                onClick={() => onSendNotification(event)}
                disabled={!event.is_published}
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
            {permissions.canEditEvents && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {permissions.canDeleteEvents && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(event.id)}
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
  );
};
