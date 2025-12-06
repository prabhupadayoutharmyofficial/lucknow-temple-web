import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Image as ImageIcon, Video, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MediaItem {
  id?: string;
  url: string;
  media_type: string;
  display_order: number;
}

interface EventMediaUploadProps {
  eventId?: string;
  onMediaChange?: (media: MediaItem[]) => void;
}

export const EventMediaUpload: React.FC<EventMediaUploadProps> = ({ eventId, onMediaChange }) => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('image');
  const { toast } = useToast();

  useEffect(() => {
    if (eventId) {
      fetchEventMedia();
    }
  }, [eventId]);

  const fetchEventMedia = async () => {
    if (!eventId) {
      setMedia([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('event_media')
        .select('*')
        .eq('event_id', eventId)
        .order('display_order');

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error('Error fetching event media:', error);
      setMedia([]);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const bucketName = selectedType === 'video' ? 'gallery-videos' : 'events';
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    setUploading(true);

    try {
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      const newMedia: MediaItem = {
        url: publicUrl,
        media_type: selectedType,
        display_order: media.length + 1
      };

      if (eventId) {
        const { data, error } = await supabase
          .from('event_media')
          .insert({ ...newMedia, event_id: eventId })
          .select()
          .single();

        if (error) throw error;
        
        const updatedMedia = [...media, data];
        setMedia(updatedMedia);
        onMediaChange?.(updatedMedia);
      } else {
        const updatedMedia = [...media, newMedia];
        setMedia(updatedMedia);
        onMediaChange?.(updatedMedia);
      }

      toast({
        title: 'Success',
        description: `${selectedType === 'video' ? 'Video' : 'Image'} uploaded successfully`,
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveMedia = async (item: MediaItem, index: number) => {
    try {
      if (item.id) {
        const { error } = await supabase
          .from('event_media')
          .delete()
          .eq('id', item.id);

        if (error) throw error;
      }

      const updatedMedia = media.filter((_, i) => i !== index);
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);

      toast({
        title: 'Success',
        description: 'Media removed successfully',
      });
    } catch (error: any) {
      console.error('Error removing media:', error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Event Media Gallery</Label>
        <p className="text-sm text-muted-foreground">Upload multiple images and videos for this event</p>
      </div>

      <div className="flex gap-4">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select media type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>

        <label className="flex-1">
          <Button 
            type="button"
            variant="outline" 
            className="w-full"
            disabled={uploading}
            onClick={() => document.getElementById('media-upload')?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            {uploading ? 'Uploading...' : `Upload ${selectedType === 'video' ? 'Video' : 'Image'}`}
          </Button>
          <input
            id="media-upload"
            type="file"
            accept={selectedType === 'video' ? 'video/*' : 'image/*'}
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border bg-muted">
              {item.media_type === 'video' ? (
                <div className="relative w-full h-full">
                  <video src={item.url} className="w-full h-full object-contain" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              ) : (
                <img src={item.url} alt="" className="w-full h-full object-contain" />
              )}
              
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveMedia(item, index)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.media_type === 'video' ? (
                  <Video className="h-4 w-4 text-white" />
                ) : (
                  <ImageIcon className="h-4 w-4 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};