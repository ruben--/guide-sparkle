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
}: GuideEditModeProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 px-8 pt-8">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl font-medium border-gray-200 focus:border-gray-300 focus:ring-gray-200"
        placeholder="Enter guide title"
      />
      <div className="flex gap-2 ml-4">
        <Button variant="ghost" size="icon" onClick={onCancel} className="hover:bg-gray-100">
          <X className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onSave} className="hover:bg-gray-100">
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-6 px-8 pb-8">
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter guide description"
        className="resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-200"
      />
      <TipTap content={content} onUpdate={setContent} />
    </CardContent>
  </div>
);