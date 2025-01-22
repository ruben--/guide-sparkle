import { useCallback, useEffect, useRef } from 'react';

interface ResizeHandleProps {
  onResize: (width: string, height: string) => void;
}

export const ResizeHandle = ({ onResize }: ResizeHandleProps) => {
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startWidth = useRef(0);
  const startHeight = useRef(0);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!imageRef.current) return;
    
    isResizing.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    startWidth.current = imageRef.current.offsetWidth;
    startHeight.current = imageRef.current.offsetHeight;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !imageRef.current) return;

    const deltaX = e.clientX - startX.current;
    const aspectRatio = startWidth.current / startHeight.current;
    
    const newWidth = Math.max(100, startWidth.current + deltaX);
    const newHeight = Math.round(newWidth / aspectRatio);

    onResize(`${newWidth}px`, `${newHeight}px`);
  }, [onResize]);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
  }, []);

  useEffect(() => {
    imageRef.current = document.querySelector('img');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      className="absolute bottom-0 right-0 w-4 h-4 bg-white border border-gray-300 rounded-sm cursor-se-resize opacity-0 group-hover:opacity-100 transition-opacity"
      onMouseDown={(e) => handleMouseDown(e as unknown as MouseEvent)}
    />
  );
};