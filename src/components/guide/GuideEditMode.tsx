import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader } from "@/components/ui/card";
import { X, Check } from "lucide-react";
import { TipTap } from "@/components/TipTap";

interface GuideEditModeProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  content: string;
  setContent: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const GuideEditMode = ({
  title,
  setTitle,
  description,
  setDescription,
  content,
  setContent,
  onSave,
  onCancel,
}: GuideEditModeProps) => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl font-bold"
        />
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
          <Button variant="default" size="icon" onClick={onSave}>
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter guide description"
          className="resize-none"
        />
        <TipTap content={content} onUpdate={setContent} />
      </CardContent>
    </>
  );
};