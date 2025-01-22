import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GuideTableRow } from "./GuideTableRow";

interface GuidesTableProps {
  guides: Array<{
    id: string;
    title: string;
    description: string | null;
    content: string | null;
    created_at: string;
  }>;
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