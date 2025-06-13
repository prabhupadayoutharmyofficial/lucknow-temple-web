
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminHero = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_section')
        .select('*')
        .limit(1)
        .single();

      if (error) throw error;
      setHeroData(data);
    } catch (error: any) {
      toast({
        title: "Error fetching hero data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditValues({ ...heroData });
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('hero_section')
        .update({
          ...editValues,
          updated_at: new Date().toISOString()
        })
        .eq('id', heroData.id);

      if (error) throw error;
      
      toast({ title: "Homepage content updated successfully!" });
      setIsEditing(false);
      setHeroData(editValues);
    } catch (error: any) {
      toast({
        title: "Error updating homepage content",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValues({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading homepage content...</div>;
  }

  if (!heroData) {
    return <div className="text-center py-8">No homepage content found.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Homepage Content</h2>
        {!isEditing && (
          <Button
            onClick={handleEdit}
            className="bg-krishna-blue hover:bg-krishna-blue/80"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Homepage
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Main Title</Label>
                  <Input
                    id="title"
                    value={editValues.title}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      title: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={editValues.subtitle}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      subtitle: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="background_image">Background Image URL</Label>
                <Input
                  id="background_image"
                  value={editValues.background_image}
                  onChange={(e) => setEditValues({
                    ...editValues,
                    background_image: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta_primary_text">Primary Button Text</Label>
                  <Input
                    id="cta_primary_text"
                    value={editValues.cta_primary_text}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      cta_primary_text: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="cta_primary_link">Primary Button Link</Label>
                  <Input
                    id="cta_primary_link"
                    value={editValues.cta_primary_link}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      cta_primary_link: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cta_secondary_text">Secondary Button Text</Label>
                  <Input
                    id="cta_secondary_text"
                    value={editValues.cta_secondary_text}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      cta_secondary_text: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="cta_secondary_link">Secondary Button Link</Label>
                  <Input
                    id="cta_secondary_link"
                    value={editValues.cta_secondary_link}
                    onChange={(e) => setEditValues({
                      ...editValues,
                      cta_secondary_link: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-krishna-blue hover:bg-krishna-blue/80"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Title:</strong> {heroData.title}
                </div>
                <div>
                  <strong>Subtitle:</strong> {heroData.subtitle}
                </div>
              </div>
              
              <div>
                <strong>Background Image:</strong> {heroData.background_image}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <strong>Primary Button:</strong> {heroData.cta_primary_text} → {heroData.cta_primary_link}
                </div>
                <div>
                  <strong>Secondary Button:</strong> {heroData.cta_secondary_text} → {heroData.cta_secondary_link}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHero;
