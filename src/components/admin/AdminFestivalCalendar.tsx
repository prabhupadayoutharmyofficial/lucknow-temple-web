import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Festival
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFestival ? 'Edit Festival' : 'Add New Festival'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFestival ? 'Update' : 'Add'} Festival
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Festivals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {festivals.map((festival) => (
                <TableRow key={festival.id}>
                  <TableCell className="font-medium">{festival.name}</TableCell>
                  <TableCell>{festival.date}</TableCell>
                  <TableCell>{festival.month}</TableCell>
                  <TableCell>{festival.description || 'No description'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(festival)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(festival.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {festivals.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No festivals found. Add your first festival!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFestivalCalendar;
