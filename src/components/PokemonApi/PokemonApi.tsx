import React, { useState } from 'react';
import { getPokemon } from '../../api/services/pokemonApiService';
import PokemonCarousel from './PokemonCarousel';

const sugerencias = [
  { name: 'pikachu', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { name: 'bulbasaur', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { name: 'charmander', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { name: 'squirtle', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { name: 'eevee', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png' },
  { name: 'snorlax', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png' },
  { name: 'gengar', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png' },
  { name: 'mew', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png' },
  { name: 'lucario', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png' },
  { name: 'dragonite', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png' },
  { name: 'lapras', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png' },
  { name: 'arcanine', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png' },
  { name: 'machamp', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png' },
  { name: 'gardevoir', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/282.png' },
  { name: 'tyranitar', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/248.png' },
];

interface PokemonApiProps {
    onSelect: (pokemon: any) => void;
}

export const PokemonApi: React.FC<PokemonApiProps> = ({ onSelect }) => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState<any>(null);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    };

    const handleSearch = async (name?: string) => {
        const searchName = name || pokemonName;
        if (!searchName) {
          setError('Introduce un nombre de Pokémon');
          return;
        }
        try {
            const data = await getPokemon(searchName);
            setPokemonData(data);
            setError('');
        } catch (err: any) {
            setError(err.message);
            setPokemonData(null);
        }
    };

    const handleSelect = () => {
        if (pokemonData) {
          onSelect(pokemonData);
        }
    };

    const handleSuggestionClick = (name: string) => {
      setPokemonName(name);
      handleSearch(name);
    };

    return (
      <>
        <h1>Selecciona un Pokémon</h1>
        <PokemonCarousel pokemons={sugerencias} onSelect={handleSuggestionClick} />
        <div className="pokemonapi">
          <input
            className="input-pokemon"
            type="text"
            value={pokemonName}
            onChange={handleInputChange}
            placeholder="Escribe el nombre del Pokémon"
          />
          <button onClick={() => handleSearch()}>Buscar</button>
        </div>
        <div className="datos-pokemon">
          {error && <p className="error">{error}</p>}
          {pokemonData && (
            <div>
              <h2>{pokemonData.name}</h2>
              <img src={pokemonData.sprites.front_default} alt={pokemonData.name} width={120} height={120} />
              <button onClick={handleSelect}>Seleccionar Pokémon</button>
            </div>
          )}
        </div>
      </>
    )
}
