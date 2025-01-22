import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const GuidesList = () => {
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Existing Guides</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Document URL</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guides?.map((guide) => (
            <TableRow key={guide.id}>
              <TableCell>{guide.title}</TableCell>
              <TableCell>{guide.description}</TableCell>
              <TableCell className="max-w-xs truncate">
                {guide.doc_url}
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