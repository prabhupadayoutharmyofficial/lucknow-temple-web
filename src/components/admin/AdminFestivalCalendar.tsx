
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X, Plus, Trash2, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FestivalEvent {
  id: string;
  name: string;
  date: string;
  month: string;
  description?: string;
  created_at?: string;
}

const AdminFestivalCalendar = () => {
  const [festivals, setFestivals] = useState<FestivalEvent[]>([]);
  const [editingFestival, setEditingFestival] = useState<string | null>(null);
  const [newFestival, setNewFestival] = useState<Partial<FestivalEvent>>({});
  const [editValues, setEditValues] = useState<Partial<FestivalEvent>>({});
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
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
      setFestivals(data || []);
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

  const handleEdit = (festival: FestivalEvent) => {
    setEditingFestival(festival.id);
    setEditValues(festival);
  };

  const handleSave = async (id: string) => {
    try {
      const { error } = await supabase
        .from('festival_calendar')
        .update({
          name: editValues.name,
          date: editValues.date,
          month: editValues.month,
          description: editValues.description
        })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Festival updated successfully!" });
      setEditingFestival(null);
      fetchFestivals();
    } catch (error: any) {
      toast({
        title: "Error updating festival",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this festival?')) return;
    
    try {
      const { error } = await supabase
        .from('festival_calendar')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: "Festival deleted successfully!" });
      fetchFestivals();
    } catch (error: any) {
      toast({
        title: "Error deleting festival",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleAddFestival = async () => {
    if (!newFestival.name || !newFestival.date || !newFestival.month) {
      toast({
        title: "Missing required fields",
        description: "Please fill in name, date, and month",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('festival_calendar')
        .insert([newFestival]);

      if (error) throw error;
      
      toast({ title: "Festival added successfully!" });
      setNewFestival({});
      setShowAddForm(false);
      fetchFestivals();
    } catch (error: any) {
      toast({
        title: "Error adding festival",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditingFestival(null);
    setEditValues({});
    setShowAddForm(false);
    setNewFestival({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading festival calendar...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-krishna-blue" />
          <h2 className="text-2xl font-bold">Manage Festival Calendar</h2>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-krishna-blue hover:bg-krishna-blue/80"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Festival
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Festival</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="new-name">Festival Name</Label>
                <Input
                  id="new-name"
                  value={newFestival.name || ''}
                  onChange={(e) => setNewFestival({ ...newFestival, name: e.target.value })}
                  placeholder="e.g., Janmashtami"
                />
              </div>
              <div>
                <Label htmlFor="new-date">Date</Label>
                <Input
                  id="new-date"
                  value={newFestival.date || ''}
                  onChange={(e) => setNewFestival({ ...newFestival, date: e.target.value })}
                  placeholder="e.g., August 15, 2025"
                />
              </div>
              <div>
                <Label htmlFor="new-month">Month</Label>
                <Input
                  id="new-month"
                  value={newFestival.month || ''}
                  onChange={(e) => setNewFestival({ ...newFestival, month: e.target.value })}
                  placeholder="e.g., August"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="new-description">Description (optional)</Label>
              <Textarea
                id="new-description"
                value={newFestival.description || ''}
                onChange={(e) => setNewFestival({ ...newFestival, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddFestival} className="bg-krishna-blue hover:bg-krishna-blue/80">
                <Save className="h-4 w-4 mr-2" />
                Add Festival
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="grid gap-4">
        {festivals.map((festival) => (
          <Card key={festival.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{festival.name}</CardTitle>
                <div className="flex gap-2">
                  {editingFestival === festival.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleSave(festival.id)}
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
                    <>
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
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingFestival === festival.id ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`name-${festival.id}`}>Festival Name</Label>
                    <Input
                      id={`name-${festival.id}`}
                      value={editValues.name || ''}
                      onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`date-${festival.id}`}>Date</Label>
                    <Input
                      id={`date-${festival.id}`}
                      value={editValues.date || ''}
                      onChange={(e) => setEditValues({ ...editValues, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`month-${festival.id}`}>Month</Label>
                    <Input
                      id={`month-${festival.id}`}
                      value={editValues.month || ''}
                      onChange={(e) => setEditValues({ ...editValues, month: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor={`description-${festival.id}`}>Description</Label>
                    <Textarea
                      id={`description-${festival.id}`}
                      value={editValues.description || ''}
                      onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <strong>Date:</strong> {festival.date}
                  </div>
                  <div>
                    <strong>Month:</strong> {festival.month}
                  </div>
                  {festival.description && (
                    <div className="md:col-span-3">
                      <strong>Description:</strong> {festival.description}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminFestivalCalendar;
