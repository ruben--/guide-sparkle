import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type Guide = Database['public']['Tables']['guides']['Row'];

export const useGuidesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [data, setData] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const { data: guides, error: guidesError } = await supabase
          .from("guides")
          .select("*")
          .order('created_at', { ascending: false });
        
        if (guidesError) {
          console.error('Error fetching guides:', guidesError);
          throw guidesError;
        }
        
        setData(guides || []);
        setError(null);
      } catch (err) {
        console.error('Error in fetchGuides:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch guides'));
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : "Failed to load guides",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuides();
  }, [toast]);

  return { data, isLoading, error };
};