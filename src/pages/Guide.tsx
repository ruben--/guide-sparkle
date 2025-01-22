import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";

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

      try {
        // Extract the document ID from the URL
        const docId = extractDocId(guideData.doc_url);
        if (!docId) {
          throw new Error("Invalid Google Doc URL");
        }

        // Fetch the document content using Google Docs API
        const response = await fetch(
          `https://docs.googleapis.com/v1/documents/${docId}?key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch document content");
        }

        const docData = await response.json();
        
        // Extract text content from the document
        let content = "";
        if (docData.body && docData.body.content) {
          content = docData.body.content.reduce((text: string, element: any) => {
            if (element.paragraph) {
              element.paragraph.elements.forEach((el: any) => {
                if (el.textRun && el.textRun.content) {
                  text += el.textRun.content;
                }
              });
            }
            return text;
          }, "");
        }

        return { ...guideData, content };
      } catch (error) {
        console.error('Error fetching doc content:', error);
        // Return the guide data even if we couldn't fetch the content
        return { ...guideData, content: "Failed to load document content" };
      }
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
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