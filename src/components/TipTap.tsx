import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextFormatToolbar } from './editor/TextFormatToolbar';
import { AlignmentToolbar } from './editor/AlignmentToolbar';
import { ListToolbar } from './editor/ListToolbar';
import { HistoryToolbar } from './editor/HistoryToolbar';
import { InsertToolbar } from './editor/InsertToolbar';

interface TipTapProps {
  content: string;
  onUpdate: (content: string) => void;
}

export const TipTap = ({ content, onUpdate }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border rounded-md',
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex flex-wrap gap-2">
        <TextFormatToolbar editor={editor} />
        <AlignmentToolbar editor={editor} />
        <ListToolbar editor={editor} />
        <HistoryToolbar editor={editor} />
        <InsertToolbar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};