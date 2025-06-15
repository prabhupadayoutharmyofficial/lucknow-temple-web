
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  month: string;
  description?: string;
}

interface FestivalFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingFestival: FestivalEvent | null;
  formData: {
    name: string;
    date: string;
    month: string;
    description: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FestivalForm = ({
  isOpen,
  onOpenChange,
  editingFestival,
  formData,
  setFormData,
  onSubmit
}: FestivalFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingFestival ? 'Edit Festival' : 'Add New Festival'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Festival Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              placeholder="e.g., January 2, 2025"
              required
            />
          </div>
          <div>
            <Label htmlFor="month">Month</Label>
            <Input
              id="month"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              placeholder="e.g., January"
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Festival description..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editingFestival ? 'Update' : 'Add'} Festival
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FestivalForm;
