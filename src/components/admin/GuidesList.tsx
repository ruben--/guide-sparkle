import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export const GuidesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: guides, isLoading, error } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const session = await supabase.auth.getSession();
      
      if (!session.data.session) {
        throw new Error("Not authenticated");
      }

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
    retry: 1,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error('Query error:', error);
          toast({
            title: "Error",
            description: "Failed to load guides. Please try logging in again.",
            variant: "destructive",
          });
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

  const handleRowClick = (guideId: string) => {
    navigate(`/guide/${guideId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Existing Guides</h2>
      {guides && guides.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Content Preview</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guides.map((guide) => (
              <TableRow 
                key={guide.id}
                onClick={() => handleRowClick(guide.id)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell>{guide.title}</TableCell>
                <TableCell>{guide.description}</TableCell>
                <TableCell className="max-w-xs">
                  <div 
                    className="truncate prose prose-sm [&_img]:max-h-20 [&_img]:w-auto [&_img]:inline-block [&_img]:object-contain"
                    dangerouslySetInnerHTML={{ __html: guide.content || '' }} 
                  />
                </TableCell>
                <TableCell>
                  {new Date(guide.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center py-4 text-gray-500">No guides found</p>
      )}
    </div>
  );
};