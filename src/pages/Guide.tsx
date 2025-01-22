import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { initializeGoogleApi, extractDocId, fetchGoogleDocContent } from "@/utils/googleApi";
import { GuideContent } from "@/components/GuideContent";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";

// Define the type for a guide with content
type GuideWithContent = Database['public']['Tables']['guides']['Row'] & {
  content?: string;
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

        const content = await fetchGoogleDocContent(docId);
        return { ...guideData, content };
      } catch (error) {
        console.error('Error fetching doc content:', error);
        toast({
          title: "Error",
          description: "Failed to load document content. Please try again later.",
          variant: "destructive",
        });

        return {
          ...guideData,
          content: "Failed to load document content. Please try again later."
        };
      }
    },
    enabled: Boolean(id && isGapiInitialized)
  });

  if (isLoading) {
    return (
      <div className="container py-8">
        <GuideLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <GuideErrorState />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container py-8">
        <GuideErrorState message="The requested guide could not be found." />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <GuideContent guide={guide} />
    </div>
  );
};