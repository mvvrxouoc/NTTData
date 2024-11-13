import React from 'react';
import {useDraggable} from '@dnd-kit/core';

interface DraggableProps {
  id: string;
  children: React.ReactNode;
}

export const Draggable: React.FC<DraggableProps>= ({id, children}) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} className="draggable" {...listeners} {...attributes}>
      {children}
    </button>
  );
}