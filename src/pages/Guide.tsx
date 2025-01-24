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
        .neq("id", id)
        .order('created_at', { ascending: false })
        .limit(3);
      
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
      <div className={isMobile ? "" : "container py-8"}>
        <GuideLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className={isMobile ? "" : "container py-8"}>
        <GuideErrorState />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className={isMobile ? "" : "container py-8"}>
        <GuideErrorState message="Den begärda guiden kunde inte hittas." />
      </div>
    );
  }

  return (
    <div className={isMobile ? "" : "container py-8"}>
      <Button
        variant="outline"
        asChild
        className="mb-6"
      >
        <Link to="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Tillbaka till Guider
        </Link>
      </Button>
      <GuideContent guide={guide} />
      
      {otherGuides && otherGuides.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Andra Guider</h2>
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
  );
};