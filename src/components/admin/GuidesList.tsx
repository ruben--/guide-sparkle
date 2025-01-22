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

export const GuidesList = () => {
  const navigate = useNavigate();
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

  if (isLoading) return <p>Loading guides...</p>;

  const handleRowClick = (guideId: string) => {
    navigate(`/guide/${guideId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Existing Guides</h2>
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
          {guides?.map((guide) => (
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
    </div>
  );
};