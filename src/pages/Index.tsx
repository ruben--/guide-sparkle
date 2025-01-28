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

  if (isLoading) {
    return (
      <div className="container max-w-6xl py-12 space-y-12">
        <SearchBar onSearch={setSearchQuery} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <GuideLoadingState key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl py-12 space-y-12">
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
    <div className="container max-w-6xl py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-medium tracking-tight text-black text-center">Så installerar du Espen</h1>
        <p className="text-gray-500 text-center max-w-2xl mx-auto">
          Find detailed installation guides for all Fever Energy products and services.
        </p>
      </div>
      <SearchBar onSearch={setSearchQuery} />
      {filteredGuides.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No guides found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <GuideCard 
              key={guide.id}
              id={guide.id}
              title={guide.title}
              description={guide.description || ""}
            />
          ))}
        </div>
      )}
      {isLoggedIn && (
        <Button
          onClick={() => navigate("/admin")}
          className="fixed bottom-8 right-8 rounded-full w-12 h-12 p-0 bg-black hover:bg-gray-800 transition-colors shadow-lg"
          size="icon"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default Index;