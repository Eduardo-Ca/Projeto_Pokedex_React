import Sidebar from "/src/components/sidebar";
import PokemonCard from "/src/components/PokemonCard";
import ScrollToTop from "/src/components/ScrollToTop";
import SearchBar from "/src/components/ui/SearchBar";
import PokemonSkeleton from "/src/components/PokemonSkeleton";
import { PokemonHome } from "/src/hooks/PokemonHome";

export default function Home() {
  const {
    pokemons,
    loading,
    error,
    hasMore,
    searchQuery,
    searchResults,
    isSearching,
    lastPokemonElementRef,
    handleSearchChange,
  } = PokemonHome();

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

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar Pokémon por nome ou ID..."
          className="mb-8"
        />

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-center max-w-md mx-auto mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isSearching &&
            searchResults.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}

          {!isSearching &&
            pokemons.map((pokemon, index) => {
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
            Array.from({ length: isSearching ? 4 : 8 }).map((_, i) => (
              <PokemonSkeleton key={i} />
            ))}
        </div>

        {!hasMore && !loading && !isSearching && (
          <p className="text-center text-text-muted mt-8 font-medium">
            Você chegou ao fim da Pokédex!
          </p>
        )}

        <ScrollToTop />
      </main>
    </div>
  );
}
