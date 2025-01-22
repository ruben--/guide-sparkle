import { Heading1, Heading2, Heading3 } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from '../EditorButton';

interface HeadingControlsProps {
  editor: Editor;
}

export const HeadingControls = ({ editor }: HeadingControlsProps) => (
  <div className="flex gap-1">
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
);