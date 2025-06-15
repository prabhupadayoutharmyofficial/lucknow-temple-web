
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  DialogTrigger,
} from '@/components/ui/dialog';
import FestivalForm from './festival/FestivalForm';
import FestivalTable from './festival/FestivalTable';

interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  month: string;
  description?: string;
}

const AdminFestivalCalendar = () => {
  const [festivals, setFestivals] = useState<FestivalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFestival, setEditingFestival] = useState<FestivalEvent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    month: '',
    description: ''
  });
  const { toast } = useToast();

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
      setFestivals((data as any[])?.map(item => ({
        id: item.id,
        name: item.name,
        date: item.date,
        month: item.month,
        description: item.description
      })) || []);
    } catch (error: any) {
      toast({
        title: "Error fetching festivals",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingFestival) {
        const { error } = await supabase
          .from('festival_calendar')
          .update(formData)
          .eq('id', editingFestival.id);
        
        if (error) throw error;
        toast({ title: "Festival updated successfully" });
      } else {
        const { error } = await supabase
          .from('festival_calendar')
          .insert([formData]);
        
        if (error) throw error;
        toast({ title: "Festival added successfully" });
      }
      
      fetchFestivals();
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast({
        title: "Error saving festival",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleEdit = (festival: FestivalEvent) => {
    setEditingFestival(festival);
    setFormData({
      name: festival.name,
      date: festival.date,
      month: festival.month,
      description: festival.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this festival?')) return;
    
    try {
      const { error } = await supabase
        .from('festival_calendar')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Festival deleted successfully" });
      fetchFestivals();
    } catch (error: any) {
      toast({
        title: "Error deleting festival",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ name: '', date: '', month: '', description: '' });
    setEditingFestival(null);
  };

  if (loading) {
    return <div className="text-center py-8">Loading festivals...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Festival Calendar Management
        </h2>
        <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Festival
        </Button>
      </div>

      <FestivalTable 
        festivals={festivals}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FestivalForm
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        editingFestival={editingFestival}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminFestivalCalendar;
