import Sidebar from "../../components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6 bg-app text-text">
        <h1 className="text-2xl font-bold">Conteúdo da Pokédex</h1>
      </main>
    </div>
  );
}
