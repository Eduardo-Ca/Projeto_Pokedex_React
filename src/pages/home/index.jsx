import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "/src/components/sidebar";
import PokemonCard from "/src/components/PokemonCard";
import ScrollToTop from "/src/components/ScrollToTop";
import api from "/src/services/api";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const LIMIT = 24;

  const loadMorePokemons = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);
      const data = await api.getPokemonPage(LIMIT, offset);

      setPokemons((prev) => [...prev, ...data.results]);
      setHasMore(data.hasMore);
      setOffset((prev) => prev + LIMIT);
    } catch (err) {
      setError("Não foi possível carregar os Pokémons.");
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  useEffect(() => {
    loadMorePokemons();
  }, []);

  const lastPokemonElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePokemons();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMorePokemons],
  );

  return (
    <div className="flex min-h-screen bg-app-bg">
      <Sidebar />

      <main className="flex-1 p-8 text-text-main relative">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Todos Pokémons
          </h1>
          <p className="text-text-muted mt-1">Explore o mundo Pokémon.</p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-center max-w-md mx-auto mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pokemons.map((pokemon, index) => {
            const isLastElement = pokemons.length === index + 1;
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                ref={isLastElement ? lastPokemonElementRef : null}
              />
            );
          })}

          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <PokemonCardSkeleton key={i} />
            ))}
        </div>

        {!hasMore && !loading && (
          <p className="text-center text-text-muted mt-8 font-medium">...</p>
        )}

        <ScrollToTop />
      </main>
    </div>
  );
}
