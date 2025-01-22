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
      } catch (error) {
        console.error('Error in query function:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
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

  if (isLoading) return (
    <div className="flex items-center justify-center py-8">
      <p className="text-muted-foreground">Loading guides...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <p className="text-red-500">Error loading guides</p>
      <p className="text-sm text-muted-foreground">
        Please ensure you're logged in and try again
      </p>
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
        <p className="text-center py-4 text-muted-foreground">No guides found</p>
      )}
    </div>
  );
};