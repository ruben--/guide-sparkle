import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GuidesTable } from "./GuidesTable";

export const GuidesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: guides, isLoading, error } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error("Authentication error");
      }

      if (!sessionData.session) {
        throw new Error("Not authenticated");
      }

      const { data, error: guidesError } = await supabase
        .from("guides")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (guidesError) {
        console.error('Error fetching guides:', guidesError);
        throw guidesError;
      }

      return data;
    },
    retry: false,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error('Query error:', error);
          if (error.message === "Not authenticated") {
            navigate("/auth");
          } else {
            toast({
              title: "Error",
              description: "Failed to load guides. Please try logging in again.",
              variant: "destructive",
            });
          }
        }
      }
    }
  });

  if (isLoading) return <p className="text-center py-4">Loading guides...</p>;

  if (error) return (
    <div className="text-center py-4 text-red-500">
      Error loading guides. Please ensure you're logged in and try again.
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Existing Guides</h2>
      {guides && guides.length > 0 ? (
        <GuidesTable 
          guides={guides} 
          onGuideClick={(id) => navigate(`/guide/${id}`)} 
        />
      ) : (
        <p className="text-center py-4 text-gray-500">No guides found</p>
      )}
    </div>
  );
};