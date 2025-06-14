
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface PopupData {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
}

const AdminPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopupData();
  }, []);

  const fetchPopupData = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_popup')
        .select('*')
        .eq('is_enabled', true)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching popup data:', error);
        return;
      }

      if (data) {
        setPopupData(data);
        setIsOpen(true);
      }
    } catch (error) {
      console.error('Error fetching popup data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !popupData) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-krishna-blue font-devotional">
            {popupData.title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          {popupData.image_url && (
            <div className="flex justify-center">
              <img
                src={popupData.image_url}
                alt={popupData.title}
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          )}
          <div className="text-gray-700 whitespace-pre-wrap">
            {popupData.content}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPopup;
