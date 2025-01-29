import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TipTap } from "@/components/TipTap";
import { useIsMobile } from "@/hooks/use-mobile";

export const AddGuideForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleAddGuide = async () => {
    try {
      if (!title) {
        toast({
          title: "Error",
          description: "Please enter a title",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('guides')
        .insert([
          { 
            title,
            description,
            content,
          }
        ]);

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      setTitle("");
      setDescription("");
      setContent("");
      toast({
        title: "Success",
        description: "Guide added successfully",
      });

      // Instead of using queryClient.invalidateQueries, we can
      // let the parent component handle updates if needed
      // through props or context
    } catch (error) {
      console.error('Error adding guide:', error);
      toast({
        title: "Error",
        description: "Failed to add guide",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg md:text-xl font-semibold">Add New Guide</h2>
      <div className="space-y-4">
        <Input
          placeholder="Enter guide title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
        <Textarea
          placeholder="Enter guide description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[100px]"
        />
        <div className={isMobile ? "w-[calc(100vw-2rem)]" : "w-full"}>
          <TipTap content={content} onUpdate={setContent} />
        </div>
        <Button onClick={handleAddGuide} className="w-full md:w-auto">
          Add Guide
        </Button>
      </div>
    </div>
  );
};