import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';

interface Task {
  id: number;
  name: string;
  category: string;
  description?: string;
  date?: string;
}

const categories = ['Ocio', 'Trabajo', 'Familia', 'Personal'];

export const DragAndDrop: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleDragEnd = (event: any) => {
    const { over } = event;
    if (over) {
      setCurrentTask({
        id: Date.now(),
        name: '',
        category: over.id,
        description: '',
        date: '',
      });
    }
  };

  const handleSave = () => {
    if (currentTask) {
      setTasks([...tasks, currentTask]);
      setCurrentTask(null);
    }
  };

  const handleCancel = () => {
    setCurrentTask(null);
  };

  return 
    
  };




