import { useState, useEffect, useRef, useCallback } from "react";
import api from "/src/services/api";

export function PokemonHome() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const observer = useRef();
  const LIMIT = 24;

  const loadMorePokemons = useCallback(async () => {
    if (loading || !hasMore || searchQuery.trim() !== "") return;

    try {
      setLoading(true);
      setError(null);
      const data = await api.getPokemonPage(LIMIT, offset);

      setPokemons((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));

        const newPokemons = data.results.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newPokemons];
      });

      setHasMore(data.hasMore);
      setOffset((prev) => prev + LIMIT);
    } catch {
      setError("Não foi possível carregar os Pokémons.");
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore, searchQuery]);

  useEffect(() => {
    let active = true;

    const initializeData = async () => {
      try {
        const names = await api.getAllPokemonNames();
        if (!active) return;
        setAllPokemonNames(names);
        
        if (pokemons.length === 0) {
          await loadMorePokemons();
        }
      } catch {
        console.error("Erro ao carregar lista de busca.");
      }
    };

    initializeData();

    return () => {
      active = false;
    };
  }, [loadMorePokemons, pokemons.length]);

  useEffect(() => {
    const term = searchQuery.toLowerCase().trim();
    
    if (!term) {
      return;
    }

    let isCurrentRequest = true;

    const delayDebounceFn = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);

        const matches = allPokemonNames.filter((p, index) => {
          const pokemonId = index + 1;
          return p.name.includes(term) || String(pokemonId) === term;
        }).slice(0, 8);

        if (matches.length === 0) {
          if (isCurrentRequest) {
            setSearchResults([]);
            setError("Nenhum Pokémon encontrado com esse nome.");
            setLoading(false);
          }
          return;
        }

        const detailPromises = matches.map((m) => api.getPokemonDetails(m.name));
        const detailedResults = await Promise.all(detailPromises);
        
        if (isCurrentRequest) {
          setSearchResults(detailedResults);
        }
      } catch {
        if (isCurrentRequest) setError("Erro ao buscar detalhes do Pokémon.");
      } finally {
        if (isCurrentRequest) setLoading(false);
      }
    }, 400);

    return () => {
      isCurrentRequest = false;
      clearTimeout(delayDebounceFn);
    };
  }, [searchQuery, allPokemonNames]);

  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading || searchQuery.trim() !== "") return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePokemons();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePokemons, searchQuery],
  );

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSearchResults([]);
      setError(null);
    }
  };

  const isSearching = searchQuery.trim() !== "";

  return {
    pokemons,
    loading,
    error,
    hasMore,
    searchQuery,
    searchResults,
    isSearching,
    lastPokemonElementRef,
    handleSearchChange
  };
}