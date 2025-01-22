import { TableCell, TableRow } from "@/components/ui/table";

interface GuideTableRowProps {
  guide: {
    id: string;
    title: string;
    description: string | null;
    content: string | null;
    created_at: string;
  };
  onClick: (id: string) => void;
}

export const GuideTableRow = ({ guide, onClick }: GuideTableRowProps) => (
  <TableRow 
    key={guide.id}
    onClick={() => onClick(guide.id)}
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
);