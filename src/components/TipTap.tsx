import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
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

interface TipTapProps {
  content: string;
  onUpdate: (content: string) => void;
}

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
        renderHTML: (attributes) => ({
          width: attributes.width,
          style: `width: ${attributes.width}`,
        }),
      },
      height: {
        default: 'auto',
        renderHTML: (attributes) => ({
          height: attributes.height,
          style: `height: ${attributes.height}`,
        }),
      },
    };
  },
  addNodeView() {
    return ({ node, getPos, editor }) => {
      const container = document.createElement('div');
      container.style.position = 'relative';
      container.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.width = parseInt(node.attrs.width) || 300;
      img.height = parseInt(node.attrs.height) || 'auto';
      img.style.cursor = 'pointer';

      const resizeHandle = document.createElement('div');
      resizeHandle.style.position = 'absolute';
      resizeHandle.style.right = '-6px';
      resizeHandle.style.bottom = '-6px';
      resizeHandle.style.width = '12px';
      resizeHandle.style.height = '12px';
      resizeHandle.style.border = '2px solid #000';
      resizeHandle.style.borderRadius = '50%';
      resizeHandle.style.backgroundColor = '#fff';
      resizeHandle.style.cursor = 'se-resize';

      let startX: number;
      let startY: number;
      let startWidth: number;
      let startHeight: number;
      let isResizing = false;

      const startResize = (e: MouseEvent) => {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = img.width;
        startHeight = img.height;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
      };

      const resize = (e: MouseEvent) => {
        if (!isResizing) return;

        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);

        img.width = width;
        img.height = height;

        if (typeof getPos === 'function') {
          editor.commands.updateAttributes('image', {
            width: `${width}px`,
            height: `${height}px`,
          });
        }
      };

      const stopResize = () => {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
      };

      resizeHandle.addEventListener('mousedown', startResize);
      container.appendChild(img);
      container.appendChild(resizeHandle);

      return {
        dom: container,
        destroy: () => {
          resizeHandle.removeEventListener('mousedown', startResize);
          document.removeEventListener('mousemove', resize);
          document.removeEventListener('mouseup', stopResize);
        },
      };
    };
  },
});

export const TipTap = ({ content, onUpdate }: TipTapProps) => {
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
      <div className="border-b p-2 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <DragHandle editor={editor} />
          <SlashMenu editor={editor} />
        </div>
        <div className="h-6 w-px bg-border mx-2" />
        <div className="flex flex-wrap gap-2">
          <TextFormatToolbar editor={editor} />
          <AlignmentToolbar editor={editor} />
          <ListToolbar editor={editor} />
          <HistoryToolbar editor={editor} />
          <InsertToolbar editor={editor} />
        </div>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};