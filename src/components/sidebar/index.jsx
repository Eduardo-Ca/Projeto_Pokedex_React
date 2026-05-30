import { useState, useEffect } from "react";
import Switch from "../../components/ui/switch";

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? JSON.parse(saved) : true;
  });

  const menu = [
    { id: "home", label: "Pokédex" },
    { id: "favorites", label: "Favoritos" },
    { id: "types", label: "Tipos" },
    { id: "settings", label: "Configurações" },
  ];

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  return (
    <aside className="h-screen w-64 bg-black/30 dark:bg-black/60 backdrop-blur-xl border-r border-white/10 p-5 flex flex-col transition">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wide">
          <span className="text-green-400">Poke</span>dex
        </h1>
        <p className="text-xs text-gray-400 mt-1">React + Tailwind UI</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-300">Tema</span>
        <Switch checked={dark} onChange={setDark} />
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`text-left px-4 py-2 rounded-xl transition ${
              active === item.id
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="text-xs text-gray-500">v1.0 • Pokédex UI</div>
    </aside>
  );
}
