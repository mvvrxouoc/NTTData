
import React from 'react';
import { DndContext } from '@dnd-kit/core';
import { Draggable } from '../DragAndDrop/Draggable';
import { useDroppable } from '@dnd-kit/core';
import { CATEGORIES } from '../../utils/constants';

interface DragAndDropCardProps {
  onCategorySelect: (category: string) => void;
  children: React.ReactNode;
}

export const DragAndDropCard: React.FC<DragAndDropCardProps> = ({ onCategorySelect, children }) => {
  const categories = Object.keys(CATEGORIES);

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable-card',
  });

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === 'droppable-card') {
      const category = event.active.id;
      onCategorySelect(category);
    }
  };
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="categories">
        {categories.map((key) => (
          <Draggable key={category} id={category}>
            {category}
          </Draggable>
        ))}
      </div>
      <div ref={setNodeRef} className={`event-card ${isOver ? 'over' : ''}`}>
        {children}
      </div>
    </DndContext>
  );
};