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

  const { data: guide, isLoading } = useQuery<GuideWithContent>({
    queryKey: ["guide", id],
    queryFn: async () => {
      // First fetch the guide data from Supabase
      const { data: guideData, error } = await supabase
        .from("guides")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching guide:', error);
        throw error;
      }

      if (guideData) {
        try {
          // Extract the document ID from the URL
          const docId = extractDocId(guideData.doc_url);
          if (!docId) {
            throw new Error("Invalid Google Doc URL");
          }

          // Fetch the document content using Google Docs API
          const response = await fetch(
            `https://docs.googleapis.com/v1/documents/${docId}?key=${process.env.GOOGLE_API_KEY}`
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

          return { ...guideData, content } as GuideWithContent;
        } catch (error) {
          console.error('Error fetching doc content:', error);
          throw error;
        }
      }
      return guideData as GuideWithContent;
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