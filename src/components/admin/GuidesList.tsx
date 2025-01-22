import { useNavigate } from "react-router-dom";
import { GuidesTable } from "./GuidesTable";
import { GuideErrorState } from "@/components/GuideErrorState";
import { GuidesGrid } from "./GuidesGrid";
import { useGuidesList } from "@/hooks/useGuidesList";

export const GuidesList = () => {
  const navigate = useNavigate();
  const { data: guides, isLoading, error } = useGuidesList();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Loading Guides</h2>
        <GuidesGrid />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Error Loading Guides</h2>
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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Existing Guides</h2>
      {guides && guides.length > 0 ? (
        <GuidesTable 
          guides={guides} 
          onGuideClick={(id) => navigate(`/guide/${id}`)} 
        />
      ) : (
        <p className="text-center py-4 text-muted-foreground">No guides found</p>
      )}
    </div>
  );
};