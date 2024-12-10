import React from 'react';
import { DragAndDrop } from '../DragAndDrop/DragAndDrop';

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory }) => {
  const handleCategorySelect = (category: string) => {
    onSelectCategory(category);
  };

  return (
    <div>
      <h2>Selecciona una Categoría</h2>
      <DragAndDrop onCategorySelect={handleCategorySelect} />
    </div>
  );
};