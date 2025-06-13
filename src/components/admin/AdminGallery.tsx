
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, Plus, Save, X, Upload, Images } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface GalleryPhoto {
  id: string;
  category: string;
  url: string;
  alt: string;
  display_order: number;
  created_at: string;
}

const AdminGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('temple');
  const { toast } = useToast();

  const categories = [
    { value: 'temple', label: 'Temple' },
    { value: 'deities', label: 'Deities' },
    { value: 'festivals', label: 'Festivals' },
    { value: 'prasadam', label: 'Prasadam' }
  ];

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .order('category', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPhotos(data || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast({
        title: "Error",
        description: "Failed to fetch gallery photos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePhoto = async (photoData: Partial<GalleryPhoto>) => {
    try {
      if (editingPhoto) {
        const { error } = await supabase
          .from('gallery_photos')
          .update(photoData)
          .eq('id', editingPhoto.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Photo updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('gallery_photos')
          .insert([photoData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Photo added successfully",
        });
      }

      fetchPhotos();
      setEditingPhoto(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving photo:', error);
      toast({
        title: "Error",
        description: "Failed to save photo",
        variant: "destructive",
      });
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      const { error } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Photo deleted successfully",
      });
      fetchPhotos();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      });
    }
  };

  const PhotoForm = ({ photo, onSave, onCancel }: {
    photo?: GalleryPhoto;
    onSave: (data: Partial<GalleryPhoto>) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      category: photo?.category || activeCategory,
      url: photo?.url || '',
      alt: photo?.alt || '',
      display_order: photo?.display_order || 1
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="url">Image URL</Label>
          <Input
            id="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://images.unsplash.com/..."
            required
          />
        </div>
        
        <div>
          <Label htmlFor="alt">Alt Text</Label>
          <Input
            id="alt"
            value={formData.alt}
            onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
            placeholder="Description of the image"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="display_order">Display Order</Label>
          <Input
            id="display_order"
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            min="1"
            required
          />
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </form>
    );
  };

  const filteredPhotos = photos.filter(photo => photo.category === activeCategory);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center">Loading gallery photos...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Images className="h-5 w-5" />
              Gallery Management
            </CardTitle>
            <CardDescription>
              Manage photos in different gallery categories
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingPhoto(null);
                setIsDialogOpen(true);
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
                </DialogTitle>
              </DialogHeader>
              <PhotoForm
                photo={editingPhoto || undefined}
                onSave={handleSavePhoto}
                onCancel={() => {
                  setEditingPhoto(null);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value} className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{category.label} Photos</h3>
                  <span className="text-sm text-muted-foreground">
                    {filteredPhotos.length} photo(s)
                  </span>
                </div>
                
                {filteredPhotos.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Preview</TableHead>
                        <TableHead>Alt Text</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPhotos.map((photo) => (
                        <TableRow key={photo.id}>
                          <TableCell>
                            <img
                              src={photo.url}
                              alt={photo.alt}
                              className="w-16 h-16 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell className="max-w-xs">
                            <div className="truncate">{photo.alt}</div>
                          </TableCell>
                          <TableCell>{photo.display_order}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingPhoto(photo);
                                  setIsDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeletePhoto(photo.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No photos in this category. Add some photos to get started.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdminGallery;
