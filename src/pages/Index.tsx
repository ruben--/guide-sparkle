import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { GuideCard } from "@/components/GuideCard";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";
import { useGuidesList } from "@/hooks/useGuidesList";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";

const Index = () => {
  const navigate = useNavigate();
  const { data: guides, isLoading, error } = useGuidesList();
  const { isLoggedIn } = useAuthState();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = guides?.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  ) || [];

  // Separate Espen guide from other guides
  const espenGuide = filteredGuides.find(guide => 
    guide.title.toLowerCase().includes('espen')
  );
  const otherGuides = filteredGuides.filter(guide => 
    !guide.title.toLowerCase().includes('espen')
  );

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-custom-red-dark mb-8">Installation av Espen</h1>
        <SearchBar onSearch={setSearchQuery} />
        <GuideLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 space-y-8 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-custom-red-dark mb-8">Installation av Espen</h1>
        <SearchBar onSearch={setSearchQuery} />
        <GuideErrorState 
          message={
            error instanceof Error 
              ? error.message 
              : "Failed to load guides. Please try again later."
          } 
        />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8 px-4 md:px-8">
      <h1 className="text-4xl font-bold text-custom-red-dark mb-8">Installation av Espen</h1>
      <SearchBar onSearch={setSearchQuery} />
      
      {/* Espen Guide - Full Width */}
      {espenGuide && (
        <div className="w-full mb-8">
          <GuideCard 
            key={espenGuide.id}
            id={espenGuide.id}
            title={espenGuide.title}
            description={espenGuide.description || ""}
          />
        </div>
      )}

      {/* Other Guides - Grid Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {otherGuides.map((guide) => (
          <GuideCard 
            key={guide.id}
            id={guide.id}
            title={guide.title}
            description={guide.description || ""}
          />
        ))}
      </div>

      {isLoggedIn && (
        <Button
          onClick={() => navigate("/admin")}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0"
          size="icon"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;
