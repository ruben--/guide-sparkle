import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

// Define the type for a guide with content
type GuideWithContent = Database['public']['Tables']['guides']['Row'] & {
  content?: string;
};

// Helper function to extract document ID from Google Docs URL
const extractDocId = (url: string) => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// Initialize Google API client
const initializeGoogleApi = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.gapi !== 'undefined') {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/documents.readonly',
            discoveryDocs: ['https://docs.googleapis.com/$discovery/rest?version=v1'],
          });
          resolve(true);
        } catch (error) {
          console.error('Error initializing Google API:', error);
          reject(error);
        }
      });
    } else {
      reject(new Error('Google API not loaded'));
    }
  });
};

export const Guide = () => {
  const { id } = useParams();
  const [isGapiInitialized, setIsGapiInitialized] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = async () => {
      try {
        await initializeGoogleApi();
        setIsGapiInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Google API:', error);
        toast({
          title: "Error",
          description: "Failed to initialize Google Docs integration. Please try again later.",
          variant: "destructive",
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const { data: guide, isLoading, error } = useQuery({
    queryKey: ["guide", id],
    queryFn: async () => {
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

      if (!isGapiInitialized) {
        return {
          ...guideData,
          content: "Loading Google Docs integration..."
        };
      }

      try {
        const docId = extractDocId(guideData.doc_url);
        if (!docId) {
          throw new Error("Invalid Google Doc URL");
        }

        // Ensure user is signed in
        if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
          await window.gapi.auth2.getAuthInstance().signIn();
        }

        // Fetch document content
        const response = await window.gapi.client.docs.documents.get({
          documentId: docId
        });

        let content = "";
        if (response.result.body?.content) {
          content = response.result.body.content.reduce((text: string, element: any) => {
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
        toast({
          title: "Error",
          description: "Failed to load document content. Please ensure you're signed in with a Google account that has access to this document.",
          variant: "destructive",
        });
        return {
          ...guideData,
          content: "Failed to load document content. Please ensure you're signed in with a Google account that has access to this document."
        };
      }
    },
    enabled: Boolean(id && isGapiInitialized)
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