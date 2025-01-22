import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TipTap } from "@/components/TipTap";

export const AddGuideForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

      queryClient.invalidateQueries({ queryKey: ["guides"] });
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
      <h2 className="text-xl font-semibold">Add New Guide</h2>
      <Input
        placeholder="Enter guide title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Enter guide description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TipTap content={content} onUpdate={setContent} />
      <Button onClick={handleAddGuide}>Add Guide</Button>
    </div>
  );
};