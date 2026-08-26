interface EmptyStateProps {
  title: string;
  hint?: string;
}

export default function EmptyState({ title, hint }: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
      <h2 className="text-xl font-semibold">{title}</h2>
      {hint ? <p className="mt-2 text-sm text-white/85">{hint}</p> : null}
    </section>
  );
}
