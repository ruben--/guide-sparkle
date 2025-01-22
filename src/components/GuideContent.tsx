import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Trash, X, Check } from "lucide-react";

type GuideContentProps = {
  guide: Database['public']['Tables']['guides']['Row'];
};

export const GuideContent = ({ guide }: GuideContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(guide.title);
  const [description, setDescription] = useState(guide.description || "");
  const [content, setContent] = useState(guide.content || "");
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  if (isEditing) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold"
          />
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handleUpdate}
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter guide description"
            className="resize-none"
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter guide content"
            className="min-h-[200px] resize-none"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl">{guide.title}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {guide.description && (
          <p className="text-muted-foreground mb-4">{guide.description}</p>
        )}
        <div className="prose max-w-none whitespace-pre-wrap">
          {guide.content}
        </div>
      </CardContent>
    </Card>
  );
};