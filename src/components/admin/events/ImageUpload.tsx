
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploadProps {
  imageUrl: string;
  onImageChange: (url: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, onImageChange }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    if (!file) return null;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `event-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from('events')
        .upload(filePath, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive"
      });
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadSuccess(false);
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      onImageChange(imageUrl);
      setUploadSuccess(true);
      toast({
        title: "Image Uploaded",
        description: "Image uploaded successfully",
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
      <Label htmlFor="image">Event Image</Label>
      <div className="flex gap-2">
        <Input
          id="image"
          value={imageUrl}
          onChange={(e) => onImageChange(e.target.value)}
          placeholder="Enter image URL or upload a file"
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
          ) : (
            <Image className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
      
      {uploadingImage && (
        <p className="text-sm text-muted-foreground">Uploading image...</p>
      )}
      {uploadSuccess && (
        <p className="text-sm text-green-600 flex items-center gap-1">
          <Check className="h-3 w-3" />
          Image uploaded successfully!
        </p>
      )}
      
      {imageUrl && (
        <div className="mt-2">
          <Label className="text-sm text-muted-foreground">Preview:</Label>
          <div className="mt-1 relative w-32 h-20 border border-gray-200 rounded overflow-hidden">
            <img
              src={imageUrl}
              alt="Event preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load:', imageUrl);
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
