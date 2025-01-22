import { Editor } from '@tiptap/react';
import { BasicFormatting } from './toolbar/BasicFormatting';
import { HeadingControls } from './toolbar/HeadingControls';
import { TextCustomization } from './toolbar/TextCustomization';

interface TextFormatToolbarProps {
  editor: Editor;
}

export const TextFormatToolbar = ({ editor }: TextFormatToolbarProps) => (
  <div className="flex gap-1 items-center border-r pr-2">
    <BasicFormatting editor={editor} />
    
    <div className="flex gap-1 border-l pl-2">
      <HeadingControls editor={editor} />
    </div>

    <div className="flex gap-1 border-l pl-2">
      <TextCustomization editor={editor} />
    </div>
  </div>
);