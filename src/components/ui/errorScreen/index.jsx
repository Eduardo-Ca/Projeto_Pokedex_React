import { useRouteError } from "react-router-dom";

export default function ErrorScreen() {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center p-6 text-text-main">
      <div className="max-w-md w-full bg-panel-bg border border-border-color p-8 rounded-3xl shadow-xl text-center">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 flex items-center justify-center rounded-2xl mx-auto mb-4 font-black text-2xl">
          !
        </div>
        <h1 className="text-2xl font-black tracking-tight mb-2">
          Ops! Algo deu errado
        </h1>
        <p className="text-text-muted text-sm mb-6">
          Ocorreu um erro crítico na aplicação. Veja os detalhes abaixo:
        </p>
        <div className="bg-app-bg/80 border border-border-color p-4 rounded-xl text-left font-mono text-xs text-red-500 overflow-x-auto mb-6 max-h-40">
          {error?.message ||
            error?.statusText ||
            "Erro de carregamento de módulo ou renderização."}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-md shadow-primary/20 hover:cursor-pointer"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
}
