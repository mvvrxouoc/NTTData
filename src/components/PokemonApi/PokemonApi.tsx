import { useState } from 'react'

export const PokemonApi = () => {

    const [pokemonName, setPokemonName] = useState('');
    const [pokemonData, setPokemonData] = useState<any>(null);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPokemonName(e.target.value);
    };

    const handleSearch = async () => {
        if (!pokemonName) {
          setError('Introduce un nombre de Pokémon');
          return;
        }
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
            if (!response.ok) {
            throw new Error('Pokémon no encontrado');
            }
            const data = await response.json();
            setPokemonData(data);
            setError('');
        } catch (err) {
            setError((err as Error).message);
            setPokemonData(null);
        }
    };

  return (
    <>
    <h1>Pokémon API</h1>
    <div className="pokemonapi">
        <input className="input-pokemon" type="text" value={pokemonName} onChange={handleInputChange} placeholder="Escribe el nombre del Pokémon" />
        <button onClick={handleSearch}>Buscar</button>
    </div>
    <div className="datos-pokemon">
    {error && <p className="error">{error}</p>}
        {pokemonData && (
            <div>
                <h2>{pokemonData.name}</h2>
                <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
            </div>
        )}
    </div>
    </>
  )
}
