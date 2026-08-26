export default function LoadingState() {
  const skeletonKeys = ['day-1', 'day-2', 'day-3', 'day-4', 'day-5'];

  return (
    <section role="status" aria-live="polite" aria-busy="true" className="space-y-6">
      <p className="sr-only">Carregando previsao do tempo...</p>
      <div
        aria-hidden="true"
        className="h-44 animate-pulse rounded-2xl border border-white/10 bg-white/5"
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {skeletonKeys.map((key) => (
          <li
            key={key}
            aria-hidden="true"
            className="h-36 animate-pulse rounded-xl border border-white/10 bg-white/5"
          />
        ))}
      </ul>
    </section>
  );
}
