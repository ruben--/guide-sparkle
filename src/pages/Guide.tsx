import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

// Define the type for a guide with content
type GuideWithContent = Database['public']['Tables']['guides']['Row'] & {
  content?: string;
};

export const Guide = () => {
  const { id } = useParams();

  const { data: guide, isLoading } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching guide:', error);
        throw error;
      }

      if (data) {
        try {
          const response = await fetch(data.doc_url);
          const content = await response.text();
          return { ...data, content } as GuideWithContent;
        } catch (error) {
          console.error('Error fetching doc content:', error);
          throw error;
        }
      }
      return data;
    },
  });

  if (isLoading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!guide) {
    return <div className="container py-8">Guide not found</div>;
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{guide.title}</CardTitle>
        </CardHeader>
        <CardContent>
          {guide.description && (
            <p className="text-muted-foreground mb-4">{guide.description}</p>
          )}
          <div className="prose max-w-none">
            {guide.content ? (
              <div dangerouslySetInnerHTML={{ __html: guide.content }} />
            ) : (
              <p>Failed to load guide content</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};