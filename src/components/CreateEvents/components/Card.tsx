
import React from 'react';

interface CardProps {
  pokemon: any;
  dateTime: string;
  category: string;
  location: string;
}

export const Card: React.FC<CardProps> = ({ pokemon, dateTime, category, location }) => {
  return (
    <div>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
      {dateTime && <p>Fecha y hora: {dateTime}</p>}
      {category && <p>Categoría: {category}</p>}
      {location && <p>Ubicación: {location}</p>}
    </div>
  );
};