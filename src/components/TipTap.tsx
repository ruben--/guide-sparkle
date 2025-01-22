import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import { TextFormatToolbar } from './editor/TextFormatToolbar';
import { AlignmentToolbar } from './editor/AlignmentToolbar';
import { ListToolbar } from './editor/ListToolbar';
import { HistoryToolbar } from './editor/HistoryToolbar';
import { InsertToolbar } from './editor/InsertToolbar';
import { DragHandle } from './editor/DragHandle';
import { SlashMenu } from './editor/SlashMenu';
import { ResizableImage } from './editor/extensions/ResizableImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface TipTapProps {
  content: string;
  onUpdate: (content: string) => void;
}

export const TipTap = ({ content, onUpdate }: TipTapProps) => {
  const isMobile = useIsMobile();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      ResizableImage,
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      FontSize,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border rounded-md overflow-x-auto',
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
    <div className="border rounded-lg max-w-full overflow-x-auto">
      <div className={`border-b p-2 flex ${isMobile ? 'flex-wrap' : ''} items-center gap-2`}>
        <div className="flex items-center gap-1">
          <DragHandle editor={editor} />
          <SlashMenu editor={editor} />
        </div>
        <div className="h-6 w-px bg-border mx-2" />
        <div className={`flex flex-wrap gap-2 ${isMobile ? 'overflow-x-auto pb-2' : ''}`}>
          <TextFormatToolbar editor={editor} />
          <AlignmentToolbar editor={editor} />
          <ListToolbar editor={editor} />
          <HistoryToolbar editor={editor} />
          <InsertToolbar editor={editor} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};