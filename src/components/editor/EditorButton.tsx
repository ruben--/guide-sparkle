import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface EditorButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  title?: string; // Added title as an optional prop
}

export const EditorButton = ({ onClick, isActive, icon: Icon, title }: EditorButtonProps) => (
  <Button
    variant="outline"
    size="sm"
    onClick={onClick}
    className={isActive ? 'bg-muted' : ''}
    title={title} // Add title attribute for tooltip
  >
    <Icon className="h-4 w-4" />
  </Button>
);