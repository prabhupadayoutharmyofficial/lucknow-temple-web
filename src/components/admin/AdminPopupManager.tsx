
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, Image, Text } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PopupData {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  is_enabled: boolean;
}

const AdminPopupManager = () => {
  const [popupData, setPopupData] = useState<PopupData>({
    title: '',
    content: '',
    image_url: '',
    is_enabled: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPopupData();
  }, []);

  const fetchPopupData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_popup')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error fetching popup data:', error);
        return;
      }

      if (data) {
        setPopupData(data);
      }
    } catch (error) {
      console.error('Error fetching popup data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const dataToSave = {
        title: popupData.title,
        content: popupData.content,
        image_url: popupData.image_url || null,
        is_enabled: popupData.is_enabled,
        updated_at: new Date().toISOString()
      };

      if (popupData.id) {
        const { error } = await supabase
          .from('admin_popup')
          .update(dataToSave)
          .eq('id', popupData.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('admin_popup')
          .insert([{
            ...dataToSave,
            created_at: new Date().toISOString()
          }])
          .select()
          .single();

        if (error) throw error;
        setPopupData({ ...popupData, id: data.id });
      }

      toast({ title: "Popup settings saved successfully!" });
    } catch (error: any) {
      toast({
        title: "Error saving popup settings",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setPopupData({ ...popupData, image_url: url });
  };

  if (loading) {
    return <div className="text-center py-8">Loading popup settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Text className="h-6 w-6 text-krishna-blue" />
        <h2 className="text-2xl font-bold">Manage Homepage Popup</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popup Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="popup-enabled"
              checked={popupData.is_enabled}
              onCheckedChange={(checked) => 
                setPopupData({ ...popupData, is_enabled: checked })
              }
            />
            <Label htmlFor="popup-enabled">Enable Popup</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-title">Popup Title</Label>
            <Input
              id="popup-title"
              value={popupData.title}
              onChange={(e) => setPopupData({ ...popupData, title: e.target.value })}
              placeholder="Enter popup title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-content">Content</Label>
            <Textarea
              id="popup-content"
              value={popupData.content}
              onChange={(e) => setPopupData({ ...popupData, content: e.target.value })}
              placeholder="Enter popup content"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-image">Image URL (optional)</Label>
            <div className="flex gap-2">
              <Input
                id="popup-image"
                value={popupData.image_url || ''}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="Enter image URL"
              />
              <Button variant="outline" size="icon">
                <Image className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {popupData.image_url && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <div className="border rounded-lg p-4 bg-gray-50">
                <img
                  src={popupData.image_url}
                  alt="Preview"
                  className="max-w-full h-auto max-h-48 mx-auto rounded"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={saving || !popupData.title.trim()}
            className="w-full bg-krishna-blue hover:bg-krishna-blue/80"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Popup Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPopupManager;
