import { useLocation } from "react-router-dom";
import Sidebar from "/src/components/sidebar";
import PokemonCard from "/src/components/PokemonCard";
import ScrollToTop from "/src/components/ScrollToTop";
import SearchBar from "/src/components/ui/SearchBar";
import PokemonSkeleton from "/src/components/PokemonSkeleton";
import { PokemonHome } from "/src/hooks/pokemonHome";

export default function Home() {
  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favoritos";

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
    favorites,
    toggleFavorite,
  } = PokemonHome();

  const term = searchQuery.toLowerCase().trim();

  const displayedPokemons = isFavoritesPage
    ? pokemons.filter((p) => favorites.includes(p.id))
    : pokemons;

  const favoriteSearchResults =
    isFavoritesPage && term
      ? displayedPokemons.filter(
          (p) => p.name.toLowerCase().includes(term) || String(p.id) === term,
        )
      : [];

  const showSearchResults = isSearching && !isFavoritesPage;
  const showFavoriteResults = isFavoritesPage && term !== "";

  return (
    <div className="flex min-h-screen bg-app-bg">
      <Sidebar />

      <main className="flex-1 p-8 text-text-main relative">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {isFavoritesPage ? "Meus Favoritos ⭐" : "Todos Pokémons"}
          </h1>
          <p className="text-text-muted mt-1">
            {isFavoritesPage
              ? "Sua coleção pessoal de pokémons guardados."
              : "Explore o mundo Pokémon."}
          </p>
        </header>

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={
            isFavoritesPage
              ? "Buscar nos favoritos..."
              : "Buscar Pokémon por nome ou ID..."
          }
          className="mb-8"
        />

        {error && !isFavoritesPage && (
          <div className="border border-border-color  bg-panel-bg p-4 rounded-2xl text-center max-w-md mx-auto mb-6">
            {error}
          </div>
        )}

        {isFavoritesPage && displayedPokemons.length === 0 && (
          <div className="text-center py-20 bg-panel-bg rounded-2xl border border-border-color max-w-xl mx-auto p-6">
            <p className="text-lg font-bold">
              Nenhum Pokémon favoritado ainda.
            </p>
            <p className="text-text-muted text-sm mt-1">
              Volte para a Pokédex e clique na estrela de qualquer Pokémon para
              salvá-lo aqui!
            </p>
          </div>
        )}

        {isFavoritesPage &&
          displayedPokemons.length > 0 &&
          showFavoriteResults &&
          favoriteSearchResults.length === 0 && (
            <div className="text-center py-12 max-w-md mx-auto">
              <p className="text-base font-semibold text-text-muted">
                Nenhum favorito encontrado para "{searchQuery}".
              </p>
            </div>
          )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 justify-center">
          {showSearchResults &&
            searchResults.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.includes(pokemon.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}

          {showFavoriteResults &&
            favoriteSearchResults.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                isFavorite={favorites.includes(pokemon.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}

          {!showSearchResults &&
            !showFavoriteResults &&
            displayedPokemons.map((pokemon, index) => {
              const isLastElement = displayedPokemons.length === index + 1;
              const shouldTrackScroll = isLastElement && !isFavoritesPage;

              return (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  ref={shouldTrackScroll ? lastPokemonElementRef : null}
                  isFavorite={favorites.includes(pokemon.id)}
                  onToggleFavorite={toggleFavorite}
                />
              );
            })}

          {loading &&
            !isFavoritesPage &&
            Array.from({ length: isSearching ? 4 : 8 }).map((_, i) => (
              <PokemonSkeleton key={i} />
            ))}
        </div>

        {!hasMore && !loading && !isSearching && !isFavoritesPage && (
          <p className="text-center text-text-muted mt-8 font-medium">...</p>
        )}

        <ScrollToTop />
      </main>
    </div>
  );
}
