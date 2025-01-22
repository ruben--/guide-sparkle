import { Bold, Italic, Underline as UnderlineIcon, Code, CornerDownRight } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from '../EditorButton';

interface BasicFormattingProps {
  editor: Editor;
}

export const BasicFormatting = ({ editor }: BasicFormattingProps) => (
  <div className="flex gap-1 items-center">
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
    <EditorButton
      onClick={() => editor.chain().focus().setHardBreak().run()}
      icon={CornerDownRight}
      title="Insert line break"
    />
  </div>
);