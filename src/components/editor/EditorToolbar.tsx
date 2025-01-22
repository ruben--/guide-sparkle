import { Editor } from '@tiptap/react';
import { DragHandle } from './DragHandle';
import { SlashMenu } from './SlashMenu';
import { TextFormatToolbar } from './TextFormatToolbar';
import { AlignmentToolbar } from './AlignmentToolbar';
import { ListToolbar } from './ListToolbar';
import { HistoryToolbar } from './HistoryToolbar';
import { InsertToolbar } from './InsertToolbar';

interface EditorToolbarProps {
  editor: Editor;
  isMobile: boolean;
}

export const EditorToolbar = ({ editor, isMobile }: EditorToolbarProps) => {
  return (
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
  );
};