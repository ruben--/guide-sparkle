import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';

interface AlignmentToolbarProps {
  editor: Editor;
}

export const AlignmentToolbar = ({ editor }: AlignmentToolbarProps) => (
  <div className="flex gap-1 items-center border-r pr-2">
    <EditorButton
      onClick={() => editor.chain().focus().setTextAlign('left').run()}
      isActive={editor.isActive({ textAlign: 'left' })}
      icon={AlignLeft}
    />
    <EditorButton
      onClick={() => editor.chain().focus().setTextAlign('center').run()}
      isActive={editor.isActive({ textAlign: 'center' })}
      icon={AlignCenter}
    />
    <EditorButton
      onClick={() => editor.chain().focus().setTextAlign('right').run()}
      isActive={editor.isActive({ textAlign: 'right' })}
      icon={AlignRight}
    />
  </div>
);