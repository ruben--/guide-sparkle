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
  <div className="animate-fade-in bg-mono-white rounded-lg shadow-lg border-2 border-mono-darker">
    <CardHeader className="flex flex-row items-start justify-between space-y-0 px-8 pt-8">
      <div className="space-y-2">
        <CardTitle className="text-3xl font-medium tracking-tight text-mono-darker">{title}</CardTitle>
        {description && (
          <p className="text-mono-dark leading-relaxed max-w-2xl">{description}</p>
        )}
      </div>
      {isLoggedIn && (
        <div className="flex gap-2 ml-4">
          <Button variant="ghost" size="icon" onClick={onEdit} className="hover:bg-mono-lighter rounded-lg">
            <Pencil className="h-4 w-4 text-coral-DEFAULT" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete} className="hover:bg-mono-lighter text-rust-DEFAULT hover:text-rust-dark rounded-lg">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      )}
    </CardHeader>
    <CardContent className="px-8 pb-8">
      {content && (
        <div 
          className="prose prose-gray max-w-none [&_a]:text-coral-DEFAULT [&_a:hover]:text-coral-light 
                     [&_br]:my-2 whitespace-pre-wrap prose-headings:font-medium prose-h1:text-3xl 
                     prose-h2:text-2xl prose-h3:text-xl prose-img:rounded-lg prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </CardContent>
  </div>
);