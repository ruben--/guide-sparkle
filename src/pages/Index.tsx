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

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <SearchBar />
        <GuideLoadingState />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8 space-y-8">
        <SearchBar />
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
    <div className="container py-8 space-y-8">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides?.map((guide) => (
          <GuideCard key={guide.id} guide={guide} />
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