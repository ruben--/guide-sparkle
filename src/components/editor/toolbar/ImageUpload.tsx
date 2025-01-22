import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Editor } from '@tiptap/react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  editor: Editor;
}

export const ImageUpload = ({ editor }: ImageUploadProps) => {
  const { toast } = useToast();

  const updateMetaImage = (imageUrl: string) => {
    const metaTag = document.querySelector('meta[property="og:image"]');
    if (metaTag) {
      metaTag.setAttribute('content', imageUrl);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      
      img.onload = async () => {
        const { naturalWidth, naturalHeight } = img;
        URL.revokeObjectURL(imageUrl);

        let width = naturalWidth;
        let height = naturalHeight;
        
        const maxWidth = 800;
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * ratio);
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('guide-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('guide-images')
          .getPublicUrl(fileName);

        updateMetaImage(publicUrl);

        const { error: updateError } = await supabase
          .from('guides')
          .update({ last_uploaded_image: publicUrl })
          .eq('id', editor.getAttributes('guide')?.id);

        if (updateError) {
          console.error('Error updating last uploaded image:', updateError);
        }

        editor?.chain().focus().insertContent({
          type: 'resizableImage',
          attrs: {
            src: publicUrl,
            width: `${width}px`,
            height: `${height}px`
          }
        }).run();

        toast({
          title: "Success",
          description: "Image uploaded successfully",
        });
      };

      img.src = imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Button
        variant="outline"
        size="sm"
        className="pointer-events-none"
      >
        <ImagePlus className="h-4 w-4" />
      </Button>
    </div>
  );
};