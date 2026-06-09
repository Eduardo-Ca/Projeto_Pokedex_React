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
    <aside className="h-screen w-64 bg-panel-bg text-text-main border-r border-border-color p-6 flex flex-col justify-between transition-colors duration-300">
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-black tracking-wide">
            <span className="text-primary">Poke</span>dex
          </h1>
          <p className="text-xs text-text-muted mt-1 font-medium">
            React + Tailwind UI
          </p>
        </div>

        <div className="flex items-center justify-between p-3 bg-app-bg/50 rounded-xl border border-border-color mb-6">
          <span className="text-sm font-medium">Tema Escuro</span>
          <Switch checked={dark} onChange={setDark} />
        </div>

        <nav className="flex flex-col gap-1.5">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`hover:cursor-pointer text-left px-4 py-2.5 rounded-xl font-medium transition-all ${
                active === item.id
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                  : "text-text-muted hover:text-text-main hover:bg-app-bg"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="text-xs text-text-muted font-medium">
        v1.0 • Pokédex UI
      </div>
    </aside>
  );
}
