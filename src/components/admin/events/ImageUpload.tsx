
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image, Check, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, onImageChange }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMedia = async (file: File) => {
    if (!file) return null;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const isVideo = file.type.startsWith('video/');
      const bucketName = isVideo ? 'gallery-videos' : 'events';
      const filePath = isVideo ? fileName : `event-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: `Error uploading ${mediaType}`,
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast({
        title: "Invalid File",
        description: "Please select an image or video file",
        variant: "destructive",
      });
      return;
    }

    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024; // 50MB for video, 5MB for image
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: `Please select a ${isVideo ? 'video' : 'image'} smaller than ${isVideo ? '50MB' : '5MB'}`,
        variant: "destructive",
      });
      return;
    }

    setUploadSuccess(false);
    const mediaUrl = await uploadMedia(file);
    if (mediaUrl) {
      onImageChange(mediaUrl);
      setUploadSuccess(true);
      toast({
        title: `${isVideo ? 'Video' : 'Image'} Uploaded`,
        description: `${isVideo ? 'Video' : 'Image'} uploaded successfully`,
      });
      setTimeout(() => setUploadSuccess(false), 3000);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Event Media (Image or Video)</Label>
      <div className="flex gap-2">
        <Select value={mediaType} onValueChange={(value: 'image' | 'video') => setMediaType(value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
          </SelectContent>
        </Select>
        <Input
          id="image"
          value={imageUrl}
          onChange={(e) => onImageChange(e.target.value)}
          placeholder={`Enter ${mediaType} URL or upload a file`}
          className="flex-1"
        />
        <Button 
          type="button"
          variant="outline" 
          size="icon"
          onClick={handleUploadButtonClick}
          disabled={uploadingImage}
          className={uploadSuccess ? "bg-green-50 border-green-200" : ""}
        >
          {uploadingImage ? (
            <Upload className="h-4 w-4 animate-spin" />
          ) : uploadSuccess ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : mediaType === 'video' ? (
            <Video className="h-4 w-4" />
          ) : (
            <Image className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept={mediaType === 'video' ? 'video/*' : 'image/*'}
          onChange={handleMediaUpload}
          className="hidden"
        />
      </div>
      
      {uploadingImage && (
        <p className="text-sm text-muted-foreground">Uploading {mediaType}...</p>
      )}
      {uploadSuccess && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <Check className="h-3 w-3" />
          {mediaType === 'video' ? 'Video' : 'Image'} uploaded successfully!
        </p>
      )}
      
      {imageUrl && (
        <div className="mt-2">
          <Label className="text-sm text-muted-foreground">Preview:</Label>
          <div className="mt-1 relative w-64 h-36 border border-gray-200 rounded overflow-hidden bg-muted">
            {(imageUrl && (/(mp4|webm|ogg)$/i.test(imageUrl) || imageUrl.includes('gallery-videos'))) ? (
              <video
                src={imageUrl}
                controls
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={imageUrl}
                alt="Event preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Image failed to load:', imageUrl);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
