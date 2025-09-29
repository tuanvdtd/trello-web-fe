import { useEffect } from 'react';

export const useDragCursor = (isDragging) => {
  useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = 'grabbing'
      document.body.classList.add('dragging')
    } else {
      document.body.style.cursor = ''
      document.body.classList.remove('dragging')
    }

    // Cleanup on unmount
    return () => {
      document.body.style.cursor = ''
      document.body.classList.remove('dragging')
    };
  }, [isDragging])
};