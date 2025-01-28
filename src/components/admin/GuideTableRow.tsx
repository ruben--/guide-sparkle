import { TableCell, TableRow } from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";

type Guide = Database['public']['Tables']['guides']['Row'];

interface GuideTableRowProps {
  guide: Guide;
  onClick: (id: string) => void;
}

export const GuideTableRow = ({ guide, onClick }: GuideTableRowProps) => (
  <TableRow 
    onClick={() => onClick(guide.id)}
    className="cursor-pointer hover:bg-muted/50"
  >
    <TableCell>{guide.title}</TableCell>
    <TableCell>{guide.description}</TableCell>
    <TableCell className="max-w-xs">
      <div 
        className="truncate prose prose-sm [&_img]:max-h-20 [&_img]:w-auto [&_img]:object-contain [&_img]:aspect-auto"
        dangerouslySetInnerHTML={{ __html: guide.content || '' }} 
      />
    </TableCell>
    <TableCell>
      {new Date(guide.created_at).toLocaleDateString()}
    </TableCell>
  </TableRow>
);