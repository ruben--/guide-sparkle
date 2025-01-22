import { ImagePlus, Link as LinkIcon } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface InsertToolbarProps {
  editor: Editor;
}

export const InsertToolbar = ({ editor }: InsertToolbarProps) => {
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Create a temporary URL for the image to get its dimensions
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      
      img.onload = async () => {
        const { width, height } = img;
        URL.revokeObjectURL(imageUrl); // Clean up the temporary URL

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('guide-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('guide-images')
          .getPublicUrl(fileName);

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

  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex gap-1 items-center border-r pr-2">
      <EditorButton
        onClick={addLink}
        isActive={editor.isActive('link')}
        icon={LinkIcon}
      />
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
    </div>
  );
};