import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TextCustomizationProps {
  editor: Editor;
}

const TEXT_COLORS = [
  { name: 'Default', color: 'inherit' },
  { name: 'Purple', color: '#6E59A5' },
  { name: 'Blue', color: '#4A90E2' },
  { name: 'Green', color: '#2ECC71' },
  { name: 'Red', color: '#E74C3C' },
];

export const TextCustomization = ({ editor }: TextCustomizationProps) => (
  <div className="flex gap-1">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[100px]">
          Text Color
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {TEXT_COLORS.map((item) => (
          <DropdownMenuItem
            key={item.name}
            onClick={() => editor.chain().focus().setColor(item.color).run()}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color === 'inherit' ? '#000' : item.color }}
            />
            {item.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);