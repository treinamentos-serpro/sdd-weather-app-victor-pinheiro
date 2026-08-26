import { type FormEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  disabled?: boolean;
}

export default function SearchBar({ onSearch, disabled = false }: SearchBarProps) {
  const [query, setQuery] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full max-w-md">
      <label htmlFor="city-search" className="sr-only">
        Buscar cidade por nome
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md transition focus-within:border-accent-300 focus-within:ring-2 focus-within:ring-accent-400/70">
        <span aria-hidden="true" className="text-white/50">
          🔎
        </span>
        <input
          id="city-search"
          type="text"
          placeholder="Buscar cidade..."
          autoComplete="off"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 outline-none sm:text-base"
        />
        <button
          type="submit"
          disabled={disabled || !query.trim()}
          className="rounded-lg bg-accent-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
