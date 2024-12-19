import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card } from './Card';

interface DroppableCardProps {
  pokemon: any;
  dateTime: string;
  category: string;
  location: string;
  onCategorySelect: (category: string) => void;
}

export const DroppableCard: React.FC<DroppableCardProps> = ({
  pokemon,
  dateTime,
  category,
  location,
  onCategorySelect,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable-card',
  });

  const style = {
    border: isOver ? '2px solid green' : '1px solid #ccc',
    padding: '20px',
    minHeight: '200px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        pokemon={pokemon}
        dateTime={dateTime}
        category={category}
        location={location}
      />
    </div>
  );
};