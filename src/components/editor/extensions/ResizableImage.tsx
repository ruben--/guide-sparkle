import Image from '@tiptap/extension-image';

export const ResizableImage = Image.extend({
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
      img.style.height = typeof node.attrs.height === 'string' ? node.attrs.height : `${node.attrs.height}px`;
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
        startHeight = img.getBoundingClientRect().height;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
      };

      const resize = (e: MouseEvent) => {
        if (!isResizing) return;

        const width = startWidth + (e.clientX - startX);
        const height = startHeight + (e.clientY - startY);

        img.width = width;
        img.style.height = `${height}px`;

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