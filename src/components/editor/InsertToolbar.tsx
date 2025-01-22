import { Editor } from '@tiptap/react';
import { ImageUpload } from './toolbar/ImageUpload';
import { LinkButton } from './toolbar/LinkButton';

interface InsertToolbarProps {
  editor: Editor;
}

export const InsertToolbar = ({ editor }: InsertToolbarProps) => {
  return (
    <div className="flex gap-1 items-center border-r pr-2">
      <LinkButton editor={editor} />
      <ImageUpload editor={editor} />
    </div>
  );
};