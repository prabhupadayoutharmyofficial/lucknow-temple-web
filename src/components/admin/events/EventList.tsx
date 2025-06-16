
import React from 'react';
import { EventCard } from './EventCard';

interface EventListProps {
  events: any[];
  onEdit: (event: any) => void;
  onDelete: (id: string) => void;
  onSendNotification: (event: any) => void;
  permissions: {
    canEditEvents: boolean;
    canDeleteEvents: boolean;
    canSendNotifications: boolean;
  };
}

export const EventList: React.FC<EventListProps> = ({ 
  events, 
  onEdit, 
  onDelete, 
  onSendNotification, 
  permissions 
}) => {
  return (
    <div className="grid gap-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
          onSendNotification={onSendNotification}
          permissions={permissions}
        />
      ))}
    </div>
  );
};
