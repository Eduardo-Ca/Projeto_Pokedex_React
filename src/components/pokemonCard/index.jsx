import { forwardRef, useState } from "react";

const PokemonCard = forwardRef(
  ({ pokemon, isFavorite, onToggleFavorite }, ref) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const statsMap = {
      hp: "HP",
      attack: "ATK",
      defense: "DEF",
      speed: "SPD",
    };

    const filteredStats =
      pokemon.stats?.filter((s) =>
        ["hp", "attack", "defense", "speed"].includes(s.stat.name),
      ) || [];

    return (
      <div
        ref={ref}
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full max-w-60 h-85 mx-auto cursor-pointer group"
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full duration-500 transition-transform"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "none",
          }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-panel-bg text-text-main rounded-2xl p-4 border-2 border-border-color shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden"
            style={{ backfaceVisibility: "hidden", zIndex: isFlipped ? 1 : 2 }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-tr from-white/0 via-white/10 to-white/20 z-10" />

            <div className="flex justify-between items-center w-full mb-3 pr-8">
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-text-muted font-black tracking-wider uppercase">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
                <h3 className="capitalize font-black text-base tracking-wide truncate">
                  {pokemon.name}
                </h3>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(pokemon.id);
              }}
              className="absolute top-4 right-4 z-30 p-1.5 rounded-xl bg-app-bg/50 backdrop-blur-sm border border-border-color hover:bg-app-bg transition-all text-amber-500 active:scale-95 cursor-pointer shadow-sm"
            >
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499c.151-.312.558-.312.709 0l2.216 4.545 5.011.41c.343.028.48.45.227.68l-3.722 3.393.125 5.027c.009.344-.336.595-.643.435L11.5 15.485l-4.43 2.518c-.307.16-.652-.09-.643-.435l.124-5.027-3.723-3.393c-.253-.23-.117-.652.227-.68l5.01-.41 2.217-4.545z"
                  />
                </svg>
              )}
            </button>

            <div className="relative flex items-center justify-center w-full aspect-square bg-app-bg rounded-xl overflow-hidden p-3 flex-1">
              <img
                src={
                  pokemon.sprites?.other?.["official-artwork"]?.front_default
                }
                alt={pokemon.name}
                className={`w-full h-full object-contain drop-shadow-[0_6px_6px_rgba(0,0,0,0.15)] transition-all duration-300 pointer-events-none ${
                  !isFlipped
                    ? "group-hover:scale-110 group-hover:-rotate-2"
                    : ""
                }`}
              />
            </div>

            <div className="flex flex-col items-center justify-center w-full mt-3 gap-1">
              <div className="flex gap-1.5 justify-center w-full">
                {pokemon.types?.map((t) => (
                  <span
                    key={t.type.name}
                    className="capitalize text-[10px] font-black px-2.5 py-0.5 rounded-full text-white tracking-wider shadow-sm border border-white/10"
                    style={{
                      backgroundColor:
                        t.type.name === "fire"
                          ? "#ef4444"
                          : t.type.name === "water"
                            ? "#3b82f6"
                            : t.type.name === "grass"
                              ? "#22c55e"
                              : t.type.name === "electric"
                                ? "#eab308"
                                : t.type.name === "bug"
                                  ? "#84cc16"
                                  : t.type.name === "normal"
                                    ? "#a8a29e"
                                    : t.type.name === "poison"
                                      ? "#a855f7"
                                      : t.type.name === "ground"
                                        ? "#ca8a04"
                                        : t.type.name === "fairy"
                                          ? "#ec4899"
                                          : "#6b7280",
                    }}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
              <p className="text-[9px] text-text-muted mt-1 italic font-medium">
                Pokédex TCG © {new Date().getFullYear()}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 w-full h-full bg-panel-bg text-text-main rounded-2xl p-4 border-2 border-border-color shadow-md flex flex-col justify-between overflow-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              zIndex: isFlipped ? 2 : 1,
            }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-tr from-white/0 via-white/5 to-white/10 z-10" />

            <div>
              <div className="flex justify-between items-center w-full mb-4 pb-2 border-b border-border-color">
                <h4 className="font-black text-sm uppercase tracking-wider text-text-muted">
                  Status Base
                </h4>
                <span className="text-[10px] bg-app-bg text-text-muted font-bold px-2 py-0.5 rounded-md border border-border-color">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {filteredStats.map((s) => {
                  const percentage = Math.min((s.base_stat / 150) * 100, 100);
                  return (
                    <div key={s.stat.name} className="flex flex-col w-full">
                      <div className="flex justify-between items-center text-xs font-bold mb-1">
                        <span className="text-text-muted uppercase text-[11px]">
                          {statsMap[s.stat.name]}
                        </span>
                        <span className="text-text-main text-[11px]">
                          {s.base_stat}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-app-bg rounded-full overflow-hidden border border-border-color/30">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-around items-center bg-app-bg rounded-xl p-2 border border-border-color text-center mt-4 relative z-20">
              <div>
                <p className="text-[10px] text-text-muted font-medium uppercase">
                  Altura
                </p>
                <p className="text-xs font-black">
                  {(pokemon.height / 10).toFixed(1)} m
                </p>
              </div>
              <div className="w-px h-6 bg-border-color" />
              <div>
                <p className="text-[10px] text-text-muted font-medium uppercase">
                  Peso
                </p>
                <p className="text-xs font-black">
                  {(pokemon.weight / 10).toFixed(1)} kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PokemonCard.displayName = "PokemonCard";
export default PokemonCard;
