import { Bold, Italic, Underline as UnderlineIcon } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';

interface TextFormatToolbarProps {
  editor: Editor;
}

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
  </div>
);