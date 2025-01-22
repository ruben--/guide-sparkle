import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";

// Define the type for a guide with content
type GuideWithContent = Database['public']['Tables']['guides']['Row'] & {
  content?: string;
};

// Helper function to extract document ID from Google Docs URL
const extractDocId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

export const Guide = () => {
  const { id } = useParams();

  const { data: guide, isLoading, error } = useQuery<GuideWithContent>({
    queryKey: ["guide", id],
    queryFn: async () => {
      // First fetch the guide data from Supabase
      const { data: guideData, error: supabaseError } = await supabase
        .from("guides")
        .select("*")
        .eq("id", id)
        .single();
      
      if (supabaseError) {
        console.error('Error fetching guide:', supabaseError);
        throw supabaseError;
      }

      if (!guideData) {
        throw new Error("Guide not found");
      }

      // For now, return just the guide data without Google Docs content
      // until we implement proper OAuth2 authentication
      return {
        ...guideData,
        content: "This content will be available soon. We're setting up secure access to the document."
      };
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-[250px]" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Failed to load guide. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Guide not found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested guide could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
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
          <div className="prose max-w-none whitespace-pre-wrap">
            {guide.content ? (
              <div>{guide.content}</div>
            ) : (
              <p>Failed to load guide content</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};