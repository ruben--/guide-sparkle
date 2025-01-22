import { Undo, Redo } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';

interface HistoryToolbarProps {
  editor: Editor;
}

export const HistoryToolbar = ({ editor }: HistoryToolbarProps) => (
  <div className="flex gap-1 items-center border-r pr-2">
    <EditorButton
      onClick={() => editor.chain().focus().undo().run()}
      icon={Undo}
    />
    <EditorButton
      onClick={() => editor.chain().focus().redo().run()}
      icon={Redo}
    />
  </div>
);