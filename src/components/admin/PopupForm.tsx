
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import PopupImageUpload from './PopupImageUpload';

interface PopupData {
  id?: string;
  title: string;
  content: string;
  image_url?: string;
  is_enabled: boolean;
}

interface PopupFormProps {
  popupData: PopupData;
  onPopupDataChange: (data: PopupData) => void;
}

const PopupForm = ({ popupData, onPopupDataChange }: PopupFormProps) => {
  const handleImageUrlChange = (url: string) => {
    onPopupDataChange({ ...popupData, image_url: url });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="popup-enabled"
          checked={popupData.is_enabled}
          onCheckedChange={(checked) => 
            onPopupDataChange({ ...popupData, is_enabled: checked })
          }
        />
        <Label htmlFor="popup-enabled">Enable Popup</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="popup-title">Popup Title</Label>
        <Input
          id="popup-title"
          value={popupData.title}
          onChange={(e) => onPopupDataChange({ ...popupData, title: e.target.value })}
          placeholder="Enter popup title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="popup-content">Content</Label>
        <Textarea
          id="popup-content"
          value={popupData.content}
          onChange={(e) => onPopupDataChange({ ...popupData, content: e.target.value })}
          placeholder="Enter popup content"
          rows={4}
        />
      </div>

      <PopupImageUpload
        imageUrl={popupData.image_url || ''}
        onImageUrlChange={handleImageUrlChange}
      />

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
    </div>
  );
};

export default PopupForm;
