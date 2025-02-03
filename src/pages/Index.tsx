import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { GuideCard } from "@/components/GuideCard";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useGuidesList } from "@/hooks/useGuidesList";
import { useAuthState } from "@/hooks/useAuthState";

const Index = () => {
  const navigate = useNavigate();
  const { data: guides, isLoading, error } = useGuidesList();
  const { isLoggedIn } = useAuthState();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGuides = guides?.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const espenGuide = filteredGuides.find(guide => 
    guide.title.toLowerCase().includes('espen')
  );
  const otherGuides = filteredGuides.filter(guide => 
    !guide.title.toLowerCase().includes('espen')
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Installation av Espen</h1>
          <p className="text-center text-gray-600 mb-12">Guider och snabbstarter för att installera och integrera Espen.</p>
          <SearchBar onSearch={setSearchQuery} />
          <GuideLoadingState />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Installation av Espen</h1>
          <p className="text-center text-gray-600 mb-12">Guider och snabbstarter för att installera och integrera Espen.</p>
          <SearchBar onSearch={setSearchQuery} />
          <GuideErrorState 
            message={
              error instanceof Error 
                ? error.message 
                : "Failed to load guides. Please try again later."
            } 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Installation av Espen</h1>
        <p className="text-center text-gray-600 mb-12">Guider och snabbstarter för att installera och integrera Espen.</p>
        <div className="mb-16">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {espenGuide && (
          <div className="mb-16">
            <h2 className="text-lg font-medium text-gray-900 mb-6">HUVUDGUIDE</h2>
            <GuideCard 
              key={espenGuide.id}
              id={espenGuide.id}
              title={espenGuide.title}
              description={espenGuide.description || ""}
            />
          </div>
        )}

        {otherGuides.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">ÖVRIGA GUIDER</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherGuides.map((guide) => (
                <GuideCard 
                  key={guide.id}
                  id={guide.id}
                  title={guide.title}
                  description={guide.description || ""}
                />
              ))}
            </div>
          </div>
        )}

        {isLoggedIn && (
          <Button
            onClick={() => navigate("/admin")}
            className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 bg-custom-red hover:bg-custom-red-dark shadow-lg"
            size="icon"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;