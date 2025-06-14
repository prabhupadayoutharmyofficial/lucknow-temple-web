
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PopupData {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export const usePopupList = () => {
  const [popups, setPopups] = useState<PopupData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPopups = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_popup')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching popups:', error);
        return;
      }

      setPopups(data || []);
    } catch (error) {
      console.error('Error fetching popups:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePopup = async (popupId: string) => {
    if (!confirm('Are you sure you want to delete this popup? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_popup')
        .delete()
        .eq('id', popupId);

      if (error) throw error;

      setPopups(prevPopups => prevPopups.filter(popup => popup.id !== popupId));
      toast({ title: "Popup deleted successfully!" });
    } catch (error: any) {
      toast({
        title: "Error deleting popup",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPopups();
  }, []);

  return {
    popups,
    loading,
    deletePopup,
    refetchPopups: fetchPopups
  };
};
