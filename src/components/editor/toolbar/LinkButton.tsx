import { Link as LinkIcon } from 'lucide-react';
import { Editor } from '@tiptap/react';
import { EditorButton } from '../EditorButton';

interface LinkButtonProps {
  editor: Editor;
}

export const LinkButton = ({ editor }: LinkButtonProps) => {
  const addLink = () => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <EditorButton
      onClick={addLink}
      isActive={editor.isActive('link')}
      icon={LinkIcon}
    />
  );
};