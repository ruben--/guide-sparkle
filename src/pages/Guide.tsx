import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { GuideContent } from "@/components/GuideContent";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";

export const Guide = () => {
  const { id } = useParams();

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

      return guideData;
    },
    enabled: Boolean(id)
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