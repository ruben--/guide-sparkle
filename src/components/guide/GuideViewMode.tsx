import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

interface GuideViewModeProps {
  title: string;
  description?: string | null;
  content?: string | null;
  isLoggedIn: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const GuideViewMode = ({
  title,
  description,
  content,
  isLoggedIn,
  onEdit,
  onDelete,
}: GuideViewModeProps) => (
  <div className="animate-fade-in">
    <CardHeader className="flex flex-row items-center justify-between space-y-0">
      <CardTitle className="text-2xl">{title}</CardTitle>
      {isLoggedIn && (
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onEdit}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="icon" onClick={onDelete}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </CardHeader>
    <CardContent>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      {content && (
        <div 
          className="prose max-w-none [&_a]:text-sky-600 [&_a:hover]:text-sky-700 [&_br]:my-2 whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </CardContent>
  </div>
);