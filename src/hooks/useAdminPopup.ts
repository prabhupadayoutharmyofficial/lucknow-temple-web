
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PopupData {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  is_enabled: boolean;
}

export const useAdminPopup = () => {
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

  const savePopupData = async () => {
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

  return {
    popupData,
    setPopupData,
    loading,
    saving,
    savePopupData
  };
};
