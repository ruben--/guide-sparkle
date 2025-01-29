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
    editorProps: {
      ...editorProps,
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border rounded-md overflow-x-auto whitespace-pre-wrap [&_a]:text-sky-600 [&_a:hover]:text-sky-700',
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log('Editor content updated:', html);
      onUpdate(html);
    },
  });

  // Update editor content when content prop changes
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      console.log('Content prop changed, updating editor:', content);
      editor.commands.setContent(content, false);
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