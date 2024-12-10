import React, { useState } from 'react';

interface DateTimeSelectorProps {
  onSelectDateTime: (dateTime: string) => void;
}

export const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ onSelectDateTime }) => {
  const [dateTime, setDateTime] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  const handleSubmit = () => {
    if (dateTime) {
      onSelectDateTime(dateTime);
    } else {
      alert('Por favor, selecciona una fecha y hora.');
    }
  };

  return (
    <div>
      <h2>Selecciona Fecha y Hora</h2>
      <input type="datetime-local" value={dateTime} onChange={handleChange} />
      <button onClick={handleSubmit}>Continuar</button>
    </div>
  );
};