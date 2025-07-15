import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

import {TaskBox} from './TaskBox';
import {TaskList} from './TaskList';
import { CATEGORIES } from '../../utils/constants';


interface DragAndDropProps {
  onCategorySelect: (category: string) => void;
}

export const DragAndDrop: React.FC<DragAndDropProps> = ( {onCategorySelect }) => {
  const [isDropped, setIsDropped] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = Object.keys(CATEGORIES);

  const handleDragEnd = (event: any) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
      setSelectedCategory(event.active.id);
    }
  };

  const handleSave = (task: any) => {
    setTasks([...tasks, task]);
    setIsDropped(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setIsDropped(false);
    setSelectedCategory(null);
  };
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="categories">
        {categories.map((category) => (
          <Draggable key={category} id={category}>
            {category}
          </Draggable>
        ))}
      </div>
      <div className="drag-and-drop-container">
        <Droppable id="droppable">
          {!isDropped && 'Arrastra una categoría aquí'}
        </Droppable>
        {isDropped && (
          <TaskBox onSave={handleSave} onCancel={handleCancel} category={selectedCategory} />
        )}
      </div>
      <TaskList tasks={tasks} />
    </DndContext>
  );
  

}
