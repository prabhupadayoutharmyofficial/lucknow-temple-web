
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
        .maybeSingle();

      if (error) {
        console.error('Error fetching popup data:', error);
        return;
      }

      if (data) {
        setPopupData(data as PopupData);
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
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0 shadow-2xl bg-white">
        {/* Header with close button */}
        <div className="relative bg-gradient-to-r from-krishna-blue to-krishna-blue/90 text-white p-6 pb-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 text-white hover:bg-white/20 h-8 w-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <h2 className="font-devotional text-2xl font-bold pr-8">
            {popupData.title}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {popupData.image_url && (
            <div className="flex justify-center">
              <div className="relative overflow-hidden rounded-lg shadow-lg max-w-full">
                <img
                  src={popupData.image_url}
                  alt={popupData.title}
                  className="max-w-full h-auto max-h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}
          
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
            {popupData.content}
          </div>
          
          {/* Action area */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-krishna-blue hover:bg-krishna-blue/90 text-white px-8"
            >
              Got it
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPopup;
