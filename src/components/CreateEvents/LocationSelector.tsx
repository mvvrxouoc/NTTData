import React, { useState } from 'react';

interface LocationSelectorProps {
  onSelectLocation: (location: string) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation }) => {
  const [location, setLocation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    if (location) {
      onSelectLocation(location);
    } else {
      alert('Por favor, ingresa una ubicación.');
    }
  };

  return (
    <div>
      <h2>Selecciona Ubicación</h2>
      <input type="text" value={location} onChange={handleChange} placeholder="Ingresa una ubicación" />
      <button onClick={handleSubmit}>Finalizar</button>
    </div>
  );
};