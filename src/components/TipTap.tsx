import { useEditor, EditorContent } from '@tiptap/react';
import { extensions, editorProps } from './editor/config/editorConfig';
import { EditorToolbar } from './editor/EditorToolbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect } from 'react';

interface TipTapProps {
  content: string;
  onUpdate: (content: string) => void;
}

export const TipTap = ({ content, onUpdate }: TipTapProps) => {
  const isMobile = useIsMobile();
  
  const editor = useEditor({
    extensions,
    editorProps,
    content: content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content) {
      // Only update if the content is different to avoid cursor jumping
      if (editor.getHTML() !== content) {
        editor.commands.setContent(content);
      }
    }
  }, [editor, content]);

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