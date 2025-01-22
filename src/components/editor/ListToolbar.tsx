import { List, ListOrdered } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';

interface ListToolbarProps {
  editor: Editor;
}

export const ListToolbar = ({ editor }: ListToolbarProps) => (
  <div className="flex gap-1 items-center border-r pr-2">
    <EditorButton
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      isActive={editor.isActive('bulletList')}
      icon={List}
      title="Bullet List"
    />
    <EditorButton
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      isActive={editor.isActive('orderedList')}
      icon={ListOrdered}
      title="Numbered List"
    />
  </div>
);