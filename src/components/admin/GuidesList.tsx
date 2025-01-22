import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { GuidesTable } from "./GuidesTable";
import { GuideLoadingState } from "@/components/GuideLoadingState";
import { GuideErrorState } from "@/components/GuideErrorState";

export const GuidesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: guides, isLoading, error } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw new Error("Authentication error");
        }

        if (!sessionData.session) {
          console.info('No session found, redirecting to auth');
          throw new Error("Not authenticated");
        }

        console.info('Fetching guides with session:', sessionData.session.access_token);
        
        const { data, error: guidesError } = await supabase
          .from("guides")
          .select("*")
          .order('created_at', { ascending: false });
        
        if (guidesError) {
          console.error('Error fetching guides:', guidesError);
          throw guidesError;
        }

        if (!data) {
          console.info('No guides found');
          return [];
        }

        console.info('Successfully fetched guides:', data.length);
        return data;
      } catch (error: any) {
        console.error('Error in query function:', error);
        // Check if it's a network error
        if (error.message === "Failed to fetch") {
          throw new Error("Network error - Please check your connection and try again");
        }
        throw error;
      }
    },
    retry: (failureCount, error: any) => {
      // Don't retry for auth errors, but retry up to 3 times for network errors
      if (error?.message === "Not authenticated") return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      onSettled: (data, error: any) => {
        if (error) {
          console.error('Query error:', error);
          if (error.message === "Not authenticated") {
            navigate("/auth");
          } else {
            toast({
              title: "Error",
              description: error.message || "Failed to load guides. Please try again later.",
              variant: "destructive",
            });
          }
        }
      }
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Loading Guides</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <GuideLoadingState key={i} />
          ))}
        </div>
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