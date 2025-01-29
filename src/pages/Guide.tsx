import { useParams } from "react-router-dom";
import { GuideContent } from "@/components/GuideContent";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { GuideCard } from "@/components/GuideCard";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Static data to replace API calls
const staticGuides = [
  {
    id: "1",
    title: "Installation av Espen",
    description: "En grundläggande guide för installation av Espen-systemet.",
    content: "Detaljerade instruktioner för Espen installation...",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Växelriktare Konfiguration",
    description: "Steg-för-steg instruktioner för att konfigurera olika typer av växelriktare.",
    content: "Guide för växelriktare konfiguration...",
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    title: "Felsökning",
    description: "Vanliga problem och lösningar vid installation av Espen.",
    content: "Felsökningsguide...",
    created_at: new Date().toISOString()
  }
];

export const Guide = () => {
  const { id } = useParams();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [guide, setGuide] = useState<any>(null);
  const [otherGuides, setOtherGuides] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      const foundGuide = staticGuides.find(g => g.id === id);
      if (foundGuide) {
        setGuide(foundGuide);
        setOtherGuides(staticGuides.filter(g => g.id !== id));
      } else {
        setError(new Error("Guide not found"));
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

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
              <h2 className="text-2xl font-medium text-gray-900 mb-8">Other Guides</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherGuides.map((otherGuide) => (
                  <GuideCard
                    key={otherGuide.id}
                    id={otherGuide.id}
                    title={otherGuide.title}
                    description={otherGuide.description}
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