export default function PokemonSkeleton() {
  return (
    <div className="p-6 bg-panel-bg border border-border-color rounded-2xl shadow-sm flex flex-col items-center animate-pulse">
      <div className="w-32 h-32 bg-text-muted/10 rounded-full mb-4" />
      <div className="h-6 bg-text-muted/20 rounded w-3/4 mb-3" />
      <div className="flex gap-2">
        <div className="h-5 bg-text-muted/10 rounded w-16" />
        <div className="h-5 bg-text-muted/10 rounded w-16" />
      </div>
    </div>
  );
}
