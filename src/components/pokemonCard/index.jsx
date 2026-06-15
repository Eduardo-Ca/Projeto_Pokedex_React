import { forwardRef } from "react";

const PokemonCard = forwardRef(({ pokemon }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full text-left p-6 bg-panel-bg border border-border-color rounded-2xl shadow-sm flex flex-col items-center hover:scale-[1.03] transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-32 h-32 object-contain mb-4"
      />

      <h3 className="font-bold text-xl capitalize">{pokemon.name}</h3>

      <div className="flex gap-2 mt-2">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold uppercase tracking-wider"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
});

PokemonCard.displayName = "PokemonCard";

export default PokemonCard;
