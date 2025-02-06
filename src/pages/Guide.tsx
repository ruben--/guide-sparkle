import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GuideContent } from "@/components/GuideContent";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { GuideCard } from "@/components/GuideCard";

export const Guide = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();

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

  const { data: otherGuides } = useQuery({
    queryKey: ["other-guides", id],
    queryFn: async () => {
      const { data, error: guidesError } = await supabase
        .from("guides")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (guidesError) {
        console.error('Error fetching other guides:', guidesError);
        throw guidesError;
      }
      
      return data || [];
    },
    enabled: Boolean(id)
  });

  if (isLoading) {
    return (
      <div className={`${isMobile ? "px-4" : "container"} py-8 max-w-4xl mx-auto`}>
        <GuideLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${isMobile ? "px-4" : "container"} py-8 max-w-4xl mx-auto`}>
        <GuideErrorState />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className={`${isMobile ? "px-4" : "container"} py-8 max-w-4xl mx-auto`}>
        <GuideErrorState message="Den begärda guiden kunde inte hittas." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className={`${isMobile ? "px-4" : "container"} py-8 max-w-4xl mx-auto`}>
        <Button
          variant="ghost"
          asChild
          className="mb-8 hover:bg-gray-100 -ml-2"
        >
          <Link to="/">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Guides
          </Link>
        </Button>
        
        <div className="space-y-8">
          <GuideContent guide={guide} />
          
          {otherGuides && otherGuides.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-100">
              <h2 className="text-2xl font-medium text-gray-900 mb-8">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherGuides.map((otherGuide) => (
                  <GuideCard
                    key={otherGuide.id}
                    id={otherGuide.id}
                    title={otherGuide.title}
                    description={otherGuide.description || ""}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};