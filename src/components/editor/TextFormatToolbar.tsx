import { Bold, Italic, Underline as UnderlineIcon, Code, Heading1, Heading2, Heading3 } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TextFormatToolbarProps {
  editor: Editor;
}

const TEXT_COLORS = [
  { name: 'Default', color: 'inherit' },
  { name: 'Purple', color: '#6E59A5' },
  { name: 'Blue', color: '#4A90E2' },
  { name: 'Green', color: '#2ECC71' },
  { name: 'Red', color: '#E74C3C' },
];

const TEXT_SIZES = [
  { name: 'Small', size: '14px' },
  { name: 'Normal', size: '16px' },
  { name: 'Large', size: '20px' },
  { name: 'Extra Large', size: '24px' },
];

export const TextFormatToolbar = ({ editor }: TextFormatToolbarProps) => (
  <div className="flex gap-1 items-center border-r pr-2">
    <EditorButton
      onClick={() => editor.chain().focus().toggleBold().run()}
      isActive={editor.isActive('bold')}
      icon={Bold}
    />
    <EditorButton
      onClick={() => editor.chain().focus().toggleItalic().run()}
      isActive={editor.isActive('italic')}
      icon={Italic}
    />
    <EditorButton
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      isActive={editor.isActive('underline')}
      icon={UnderlineIcon}
    />
    <EditorButton
      onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      isActive={editor.isActive('codeBlock')}
      icon={Code}
    />
    
    <div className="flex gap-1 border-l pl-2">
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        icon={Heading1}
      />
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        icon={Heading2}
      />
      <EditorButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        icon={Heading3}
      />
    </div>

    <div className="flex gap-1 border-l pl-2">
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
              onClick={() => editor.chain().focus().setStyle({ color: item.color }).run()}
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-[100px]">
            Text Size
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {TEXT_SIZES.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => editor.chain().focus().setStyle({ fontSize: item.size }).run()}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);