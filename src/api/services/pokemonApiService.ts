
export const getPokemon = async (pokemonName: string): Promise<any> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error('Pokémon no encontrado');
    }
  
    const data = await response.json();
    return data;
  };