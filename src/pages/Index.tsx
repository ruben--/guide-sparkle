import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { GuideCard } from "@/components/GuideCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: guides, isLoading, error } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("guides")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching guides:', error);
        throw error;
      }
      return data;
    },
  });

  const filteredGuides = guides?.filter(
    (guide) =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (guide.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  ) || [];

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <GuideErrorState message="Failed to load guides. Please try again later." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-4xl font-bold mb-8 text-black text-center">Installation Guides</h1>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="flex flex-col gap-6 mt-8">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <GuideLoadingState key={index} />
            ))
          ) : filteredGuides.length > 0 ? (
            filteredGuides.map((guide) => (
              <GuideCard 
                key={guide.id} 
                id={guide.id} 
                title={guide.title} 
                description={guide.description || ""} 
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No guides found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;