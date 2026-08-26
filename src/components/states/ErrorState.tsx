interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="rounded-2xl border border-red-200/60 bg-red-300/20 p-6 backdrop-blur-md"
    >
      <h2 className="text-xl font-semibold text-red-50">Nao foi possivel carregar o clima</h2>
      <p className="mt-2 text-red-50">{message ?? 'Tente novamente em alguns instantes.'}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-red-300 px-4 py-2 text-sm font-semibold text-red-950 transition hover:bg-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-100"
      >
        tentar novamente
      </button>
    </section>
  );
}
