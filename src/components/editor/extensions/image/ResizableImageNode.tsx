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
      <div className="relative inline-block group">
        <img
          src={node.attrs.src}
          style={{
            width: node.attrs.width || 'auto',
            height: 'auto', // Always auto to maintain aspect ratio
            maxWidth: '100%',
            objectFit: 'contain',
          }}
          className="cursor-pointer rounded-md aspect-auto"
        />
        <ResizeHandle onResize={handleResize} />
      </div>
    </NodeViewWrapper>
  );
};