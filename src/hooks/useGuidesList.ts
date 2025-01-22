import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useGuidesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) throw new Error("Authentication error");

      if (!sessionData.session) {
        throw new Error("Not authenticated");
      }

      const { data, error: guidesError } = await supabase
        .from("guides")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (guidesError) throw guidesError;
      return data || [];
    },
    retry: (failureCount, error: any) => {
      if (error?.message === "Not authenticated") return false;
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      onSettled: (data, error: any) => {
        if (error) {
          if (error.message === "Not authenticated") {
            navigate("/auth");
          } else {
            toast({
              title: "Error",
              description: error.message || "Failed to load guides",
              variant: "destructive",
            });
          }
        }
      }
    }
  });
};