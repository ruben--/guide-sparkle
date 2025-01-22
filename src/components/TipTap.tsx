import { useEditor, EditorContent } from '@tiptap/react';
import { extensions, editorProps } from './editor/config/editorConfig';
import { EditorToolbar } from './editor/EditorToolbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface TipTapProps {
  content: string;
  onUpdate: (content: string) => void;
}

export const TipTap = ({ content, onUpdate }: TipTapProps) => {
  const isMobile = useIsMobile();
  
  const editor = useEditor({
    extensions,
    editorProps,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg max-w-full overflow-x-auto">
      <EditorToolbar editor={editor} isMobile={isMobile} />
      <div className="overflow-x-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};