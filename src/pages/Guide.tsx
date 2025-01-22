import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <iframe 
            src={guide.doc_url}
            className="w-full min-h-[800px] border-0"
            title={guide.title}
          />
        </CardContent>
      </Card>
    </div>
  );
};