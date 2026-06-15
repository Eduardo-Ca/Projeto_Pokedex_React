const BASE_URL = "https://pokeapi.co/api/v2";
const pokemonCache = {};

async function fetchHandler(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

const api = {
  getPokemonDetails: async (nameOrId) => {
    const term = String(nameOrId).toLowerCase().trim();
    if (pokemonCache[term]) return pokemonCache[term];

    const data = await fetchHandler(`${BASE_URL}/pokemon/${term}`);
    pokemonCache[term] = data;
    pokemonCache[data.id] = data;
    pokemonCache[data.name] = data;
    return data;
  },

  getPokemonPage: async (limit = 24, offset = 0) => {
    const listData = await fetchHandler(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    const detailPromises = listData.results.map((p) => api.getPokemonDetails(p.name));
    const results = await Promise.all(detailPromises);
    
    return {
      results,
      hasMore: listData.next !== null
    };
  },

  getAllPokemonNames: async () => {
    const data = await fetchHandler(`${BASE_URL}/pokemon?limit=1025&offset=0`);
    return data.results; 
  }
};

export default api;