
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';
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
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-orange-50/30 to-amber-50/50 backdrop-blur-sm">
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-krishna-gold via-krishna-saffron to-krishna-gold"></div>
        
        {/* Close button - floating style */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 bg-white/80 hover:bg-white shadow-md rounded-full h-10 w-10 text-gray-600 hover:text-gray-800 transition-all duration-200"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Content Container */}
        <div className="relative">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-krishna-gold to-krishna-saffron rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0 pr-12">
                <h1 className="text-3xl font-devotional font-bold text-krishna-blue leading-tight mb-2">
                  {popupData.title}
                </h1>
                <div className="w-16 h-0.5 bg-gradient-to-r from-krishna-gold to-krishna-saffron rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          {popupData.image_url && (
            <div className="px-8 mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-krishna-gold/20 to-krishna-saffron/20 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white p-3 rounded-xl shadow-lg">
                  <img
                    src={popupData.image_url}
                    alt={popupData.title}
                    className="w-full h-auto max-h-80 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="px-8 mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg font-light">
                {popupData.content}
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="px-8 pb-8">
            <div className="flex justify-center">
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-krishna-blue to-krishna-blue/90 hover:from-krishna-blue/90 hover:to-krishna-blue text-white px-10 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Got it, thanks!
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative bottom pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-krishna-gold/5 to-transparent pointer-events-none"></div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPopup;
