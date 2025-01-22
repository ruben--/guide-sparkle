import { Editor } from '@tiptap/react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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

const FONT_SIZES = [
  { name: 'Small', size: '0.875em' },
  { name: 'Normal', size: '1em' },
  { name: 'Large', size: '1.25em' },
  { name: 'Extra Large', size: '1.5em' },
];

const HIGHLIGHT_COLORS = [
  { name: 'Yellow', color: '#FEF7CD' },
  { name: 'Green', color: '#F2FCE2' },
  { name: 'Blue', color: '#D3E4FD' },
  { name: 'Pink', color: '#FFDEE2' },
];

export const TextCustomization = ({ editor }: TextCustomizationProps) => (
  <div className="flex gap-1">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-[100px]">
          Customize
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="p-2">
          <div className="font-semibold mb-2">Text Color</div>
          <div className="grid grid-cols-5 gap-1 mb-2">
            {TEXT_COLORS.map((item) => (
              <button
                key={item.name}
                onClick={() => editor.chain().focus().setColor(item.color).run()}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: item.color === 'inherit' ? '#000' : item.color }}
                title={item.name}
              />
            ))}
          </div>
          
          <DropdownMenuSeparator />
          
          <div className="font-semibold mb-2 mt-2">Highlight</div>
          <div className="grid grid-cols-4 gap-1 mb-2">
            {HIGHLIGHT_COLORS.map((item) => (
              <button
                key={item.name}
                onClick={() => editor.chain().focus().setHighlight({ color: item.color }).run()}
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: item.color }}
                title={item.name}
              />
            ))}
          </div>

          <DropdownMenuSeparator />

          <div className="font-semibold mb-2 mt-2">Font Size</div>
          {FONT_SIZES.map((item) => (
            <DropdownMenuItem
              key={item.name}
              onClick={() => editor.chain().focus().setFontSize(item.size).run()}
            >
              {item.name}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);