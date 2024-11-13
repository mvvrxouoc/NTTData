import React, { useState, useEffect } from 'react';

export const TaskBox: React.FC<{ onSave: (task: any) => void; onCancel: () => void; category: string | null }> = ({ onSave, onCancel, category }) => {
  const [task, setTask] = useState({ name: '', description: '', date: '', category: '' });

  useEffect(() => {
    if (category) {
        setTask((prevTask) => ({ ...prevTask, category }));
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSave = () => {
    onSave(task);
  };

  return (
    <div className="task-box">
      <p>Categoría: {category}</p>
      <input type="text" name="name" placeholder="Nombre del Evento" onChange={handleChange} />
      <input name="description" placeholder="Descripción del Evento" onChange={handleChange} />
      <input type="datetime-local" name="date" onChange={handleChange} />
      <button onClick={handleSave}>Guardar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};