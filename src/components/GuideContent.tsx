import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Database } from "@/integrations/supabase/types";
import { GuideEditMode } from "./guide/GuideEditMode";
import { GuideViewMode } from "./guide/GuideViewMode";
import { useAuthState } from "@/hooks/useAuthState";

type GuideContentProps = {
  guide: Database['public']['Tables']['guides']['Row'];
};

export const GuideContent = ({ guide }: GuideContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(guide.title);
  const [description, setDescription] = useState(guide.description || "");
  const [content, setContent] = useState(guide.content || "");
  const isLoggedIn = useAuthState();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Reset form state when switching to edit mode
  const handleEditClick = () => {
    setTitle(guide.title);
    setDescription(guide.description || "");
    setContent(guide.content || "");
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from('guides')
        .update({
          title,
          description,
          content
        })
        .eq('id', guide.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Guide updated successfully",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["guide", guide.id] });
      queryClient.invalidateQueries({ queryKey: ["guides"] });
    } catch (error) {
      console.error('Error updating guide:', error);
      toast({
        title: "Error",
        description: "Failed to update guide",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;

    try {
      const { error } = await supabase
        .from('guides')
        .delete()
        .eq('id', guide.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Guide deleted successfully",
      });
      navigate("/");
    } catch (error) {
      console.error('Error deleting guide:', error);
      toast({
        title: "Error",
        description: "Failed to delete guide",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      {isEditing ? (
        <GuideEditMode
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          content={content}
          setContent={setContent}
          onSave={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <GuideViewMode
          title={guide.title}
          description={guide.description}
          content={guide.content}
          isLoggedIn={isLoggedIn}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      )}
    </Card>
  );
};