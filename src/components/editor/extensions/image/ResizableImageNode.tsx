import { NodeViewWrapper } from '@tiptap/react';
import { ResizeHandle } from './ResizeHandle';

interface ResizableImageNodeProps {
  node: {
    attrs: {
      src: string;
      width?: string;
      height?: string;
    };
  };
  updateAttributes: (attrs: Record<string, any>) => void;
}

export const ResizableImageNode = ({ node, updateAttributes }: ResizableImageNodeProps) => {
  const handleResize = (width: string, height: string) => {
    updateAttributes({
      width,
      height,
    });
  };

  return (
    <NodeViewWrapper>
      <div className="relative inline-block max-w-full">
        <img
          src={node.attrs.src}
          style={{
            width: node.attrs.width || 'auto',
            height: node.attrs.height || 'auto',
            maxWidth: '100%',
          }}
          className="cursor-pointer"
        />
        <ResizeHandle onResize={handleResize} />
      </div>
    </NodeViewWrapper>
  );
};