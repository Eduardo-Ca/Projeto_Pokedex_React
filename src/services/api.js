const BASE_URL = "https://pokeapi.co/api/v2";

const pokemonCache = {};

async function fetchHandler(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

const api = {
  getPokemonDetails: async (nameOrId) => {
    if (pokemonCache[nameOrId]) {
      return pokemonCache[nameOrId];
    }

    const data = await fetchHandler(`${BASE_URL}/pokemon/${nameOrId}`);
    pokemonCache[nameOrId] = data;
    return data;
  },

  getPokemonPage: async (limit = 24, offset = 0) => {
    const listData = await fetchHandler(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    
    const detailPromises = listData.results.map((pokemon) =>
      api.getPokemonDetails(pokemon.name)
    );
    
    const results = await Promise.all(detailPromises);
    
    return {
      results,
      hasMore: listData.next !== null
    };
  }
};

export default api;