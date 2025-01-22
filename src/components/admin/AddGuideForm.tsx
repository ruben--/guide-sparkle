import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const AddGuideForm = () => {
  const [docUrl, setDocUrl] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddDoc = async () => {
    try {
      if (!docUrl.startsWith('https://')) {
        toast({
          title: "Error",
          description: "Please enter a valid URL starting with https://",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('guides')
        .insert([
          { 
            title: "New Guide",
            doc_url: docUrl,
          }
        ]);

      if (error) {
        console.error('Error details:', error);
        throw error;
      }

      setDocUrl("");
      toast({
        title: "Success",
        description: "Guide added successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["guides"] });
    } catch (error) {
      console.error('Error adding document:', error);
      toast({
        title: "Error",
        description: "Failed to add document",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Guide</h2>
      <Input
        placeholder="Enter Google Doc URL"
        value={docUrl}
        onChange={(e) => setDocUrl(e.target.value)}
      />
      <Button onClick={handleAddDoc}>Add Document</Button>
    </div>
  );
};