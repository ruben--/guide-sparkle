import { useCallback, useEffect, useState } from 'react';

interface ResizeHandleProps {
  onResize: (width: string, height: string) => void;
}

export const ResizeHandle = ({ onResize }: ResizeHandleProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [startDimensions, setStartDimensions] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const startResize = useCallback((e: MouseEvent) => {
    const img = (e.target as HTMLElement).parentElement?.querySelector('img');
    if (!img) return;

    setIsResizing(true);
    setStartDimensions({
      x: e.clientX,
      y: e.clientY,
      width: img.getBoundingClientRect().width,
      height: img.getBoundingClientRect().height,
    });
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const width = startDimensions.width + (e.clientX - startDimensions.x);
    const aspectRatio = startDimensions.width / startDimensions.height;
    const height = width / aspectRatio;

    onResize(`${width}px`, `${height}px`);
  }, [isResizing, startDimensions, onResize]);

  const stopResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    }

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing, resize, stopResize]);

  return (
    <div
      onMouseDown={startResize as any}
      className="absolute -right-1.5 -bottom-1.5 w-3 h-3 border-2 border-black rounded-full bg-white cursor-se-resize"
    />
  );
};