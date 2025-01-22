import { List, ListOrdered } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from './EditorButton';

interface ListToolbarProps {
  editor: Editor;
}

export const ListToolbar = ({ editor }: ListToolbarProps) => (
  <div className="flex gap-1 items-center border-r pr-2">
    <EditorButton
      onClick={() => {
        if (editor.isActive('bulletList')) {
          editor.chain().focus().liftListItem('listItem').run();
        } else {
          editor.chain().focus().wrapInList('bulletList').run();
        }
      }}
      isActive={editor.isActive('bulletList')}
      icon={List}
      title="Bullet List"
    />
    <EditorButton
      onClick={() => {
        if (editor.isActive('orderedList')) {
          editor.chain().focus().liftListItem('listItem').run();
        } else {
          editor.chain().focus().wrapInList('orderedList').run();
        }
      }}
      isActive={editor.isActive('orderedList')}
      icon={ListOrdered}
      title="Numbered List"
    />
  </div>
);