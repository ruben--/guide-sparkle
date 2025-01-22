import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/SearchBar";
import { GuideCard } from "@/components/GuideCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: guides, isLoading } = useQuery({
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Guides Portal</h1>
          <Link to="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        </div>
        
        <SearchBar onSearch={setSearchQuery} />
        
        <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p>Loading guides...</p>
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
            <p>No guides found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;