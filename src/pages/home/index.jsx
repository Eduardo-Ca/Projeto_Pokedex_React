import Sidebar from "../../components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 text-text-main">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">
            Todos Pokemons
          </h1>
          <p className="text-text-muted mt-1">Explore o mundo Pokémon.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-panel-bg border border-border-color rounded-2xl shadow-sm">
            <h3 className="font-bold text-lg">Bulbasaur</h3>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-bold mt-2 inline-block">
              Grama
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
