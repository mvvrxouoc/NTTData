import { useState } from 'react'
import { getPokemon } from '../../api/services/pokemonApiService';

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
            const data = await getPokemon(pokemonName);
            setPokemonData(data);
            setError('');
        } catch (err: any) {
            setError(err.message);
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
