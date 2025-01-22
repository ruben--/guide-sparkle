import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-font-size';
import Highlight from '@tiptap/extension-highlight';
import { ResizableImage } from '../extensions/image/ResizableImageExtension';

export const extensions = [
  StarterKit.configure({
    orderedList: {
      keepMarks: true,
      keepAttributes: true,
      HTMLAttributes: {
        class: 'list-decimal pl-4'
      }
    },
    bulletList: {
      keepMarks: true,
      keepAttributes: true,
      HTMLAttributes: {
        class: 'list-disc pl-4'
      }
    },
    hardBreak: {
      HTMLAttributes: {
        class: 'my-2'
      }
    },
  }),
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
];

export const editorProps = {
  attributes: {
    class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 border rounded-md overflow-x-auto whitespace-pre-wrap',
  },
  handleDOMEvents: {
    keydown: (view: any, event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        return true;
      }
      return false;
    },
  },
  parseOptions: {
    preserveWhitespace: 'full',
  },
  enableInputRules: true,
  enablePasteRules: true,
  transformPastedHTML: (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.innerHTML;
  },
};
