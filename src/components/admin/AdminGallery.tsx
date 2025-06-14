
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
import { Trash2, Edit, Plus, Save, X, Upload, Images, Link, Folder, FolderPlus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface GalleryPhoto {
  id: string;
  category: string;
  url: string;
  alt: string;
  display_order: number;
  collection_id: string | null;
  created_at: string;
}

interface PhotoCollection {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

const AdminGallery = () => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [collections, setCollections] = useState<PhotoCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<PhotoCollection | null>(null);
  const [activeCategory, setActiveCategory] = useState('temple');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { toast } = useToast();

  const categories = [
    { value: 'temple', label: 'Temple' },
    { value: 'deities', label: 'Deities' },
    { value: 'festivals', label: 'Festivals' },
    { value: 'prasadam', label: 'Prasadam' }
  ];

  useEffect(() => {
    fetchPhotos();
    fetchCollections();
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

  const fetchCollections = async () => {
    try {
      const { data, error } = await supabase
        .from('photo_collections')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast({
        title: "Error",
        description: "Failed to fetch photo collections",
        variant: "destructive",
      });
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleSavePhoto = async (photoData: {
    category: string;
    url: string;
    alt: string;
    display_order: number;
    collection_id: string | null;
  }) => {
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

  const handleSaveCollection = async (collectionData: {
    name: string;
    description: string | null;
  }) => {
    try {
      if (editingCollection) {
        const { error } = await supabase
          .from('photo_collections')
          .update(collectionData)
          .eq('id', editingCollection.id);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Collection updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('photo_collections')
          .insert([collectionData]);

        if (error) throw error;
        toast({
          title: "Success",
          description: "Collection created successfully",
        });
      }

      fetchCollections();
      setEditingCollection(null);
      setIsCollectionDialogOpen(false);
    } catch (error) {
      console.error('Error saving collection:', error);
      toast({
        title: "Error",
        description: "Failed to save collection",
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

  const handleDeleteCollection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this collection? Photos in this collection will not be deleted.')) return;

    try {
      const { error } = await supabase
        .from('photo_collections')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
      fetchCollections();
      if (selectedCollection === id) {
        setSelectedCollection(null);
      }
    } catch (error) {
      console.error('Error deleting collection:', error);
      toast({
        title: "Error",
        description: "Failed to delete collection",
        variant: "destructive",
      });
    }
  };

  const PhotoForm = ({ photo, onSave, onCancel }: {
    photo?: GalleryPhoto;
    onSave: (data: {
      category: string;
      url: string;
      alt: string;
      display_order: number;
      collection_id: string | null;
    }) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      category: photo?.category || activeCategory,
      url: photo?.url || '',
      alt: photo?.alt || '',
      display_order: photo?.display_order || 1,
      collection_id: photo?.collection_id || null
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setFormData({ ...formData, alt: file.name.split('.')[0] });
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      let finalUrl = formData.url;
      
      if (uploadMethod === 'upload' && selectedFile) {
        setUploading(true);
        const uploadedUrl = await uploadFile(selectedFile);
        setUploading(false);
        
        if (!uploadedUrl) return;
        finalUrl = uploadedUrl;
      }
      
      if (!finalUrl) {
        toast({
          title: "Error",
          description: "Please provide an image URL or upload a file",
          variant: "destructive",
        });
        return;
      }
      
      onSave({
        ...formData,
        url: finalUrl,
        collection_id: formData.collection_id || null
      });
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
          <Label htmlFor="collection">Collection (Optional)</Label>
          <Select 
            value={formData.collection_id || ""} 
            onValueChange={(value) => setFormData({ ...formData, collection_id: value || null })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a collection (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">No Collection</SelectItem>
              {collections.map((collection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Image Source</Label>
          <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'url' | 'upload')} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="mt-4">
              <div>
                <Label htmlFor="url">Image URL</Label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  required={uploadMethod === 'url'}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="mt-4">
              <div>
                <Label htmlFor="file">Upload Image</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={uploadMethod === 'upload'}
                />
                {selectedFile && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
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
          <Button type="button" variant="outline" onClick={onCancel} disabled={uploading}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? (
              <>
                <Upload className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    );
  };

  const CollectionForm = ({ collection, onSave, onCancel }: {
    collection?: PhotoCollection;
    onSave: (data: { name: string; description: string | null }) => void;
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState({
      name: collection?.name || '',
      description: collection?.description || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({
        name: formData.name,
        description: formData.description || null
      });
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Collection Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Janmashtami 2024"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of this collection..."
            rows={3}
          />
        </div>
        
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Collection
          </Button>
        </div>
      </form>
    );
  };

  const filteredPhotos = photos.filter(photo => {
    const categoryMatch = photo.category === activeCategory;
    const collectionMatch = selectedCollection ? photo.collection_id === selectedCollection : true;
    return categoryMatch && collectionMatch;
  });

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
              Manage photos in different gallery categories and collections. Upload files or use external URLs.
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={isCollectionDialogOpen} onOpenChange={setIsCollectionDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => {
                  setEditingCollection(null);
                  setIsCollectionDialogOpen(true);
                }}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  New Collection
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingCollection ? 'Edit Collection' : 'Create New Collection'}
                  </DialogTitle>
                </DialogHeader>
                <CollectionForm
                  collection={editingCollection || undefined}
                  onSave={handleSaveCollection}
                  onCancel={() => {
                    setEditingCollection(null);
                    setIsCollectionDialogOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
            
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
                  <div className="flex items-center gap-4">
                    {collections.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Label htmlFor="collection-filter">Filter by Collection:</Label>
                        <Select value={selectedCollection || ""} onValueChange={(value) => setSelectedCollection(value || null)}>
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="All photos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All photos</SelectItem>
                            {collections.map((collection) => (
                              <SelectItem key={collection.id} value={collection.id}>
                                <div className="flex items-center gap-2">
                                  <Folder className="h-4 w-4" />
                                  {collection.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {filteredPhotos.length} photo(s)
                    </span>
                  </div>
                </div>

                {collections.length > 0 && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      Collections
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {collections.map((collection) => (
                        <div key={collection.id} className="flex items-center justify-between bg-background p-2 rounded border">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{collection.name}</div>
                            {collection.description && (
                              <div className="text-xs text-muted-foreground">{collection.description}</div>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingCollection(collection);
                                setIsCollectionDialogOpen(true);
                              }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteCollection(collection.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {filteredPhotos.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Preview</TableHead>
                        <TableHead>Alt Text</TableHead>
                        <TableHead>Collection</TableHead>
                        <TableHead>Order</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPhotos.map((photo) => {
                        const photoCollection = collections.find(c => c.id === photo.collection_id);
                        return (
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
                            <TableCell>
                              {photoCollection ? (
                                <div className="flex items-center gap-1 text-sm">
                                  <Folder className="h-3 w-3" />
                                  {photoCollection.name}
                                </div>
                              ) : (
                                <span className="text-muted-foreground text-sm">No collection</span>
                              )}
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
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    {selectedCollection 
                      ? `No photos in this collection for ${category.label.toLowerCase()} category.`
                      : `No photos in this category. Add some photos to get started.`
                    }
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
