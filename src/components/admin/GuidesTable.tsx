import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GuideTableRow } from "./GuideTableRow";
import { Database } from "@/integrations/supabase/types";

type Guide = Database['public']['Tables']['guides']['Row'];

interface GuidesTableProps {
  guides: Guide[];
  onGuideClick: (id: string) => void;
}

export const GuidesTable = ({ guides, onGuideClick }: GuidesTableProps) => (
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
        <GuideTableRow 
          key={guide.id}
          guide={guide}
          onClick={onGuideClick}
        />
      ))}
    </TableBody>
  </Table>
);