import { useEffect, useMemo, useState, useCallback } from "react";
import { PokemonCard } from "./components/PokemonCard";
import {
  getPokemonByName,
  getPokemonList,
  searchPokemon,
} from "./services/pokemon";
import type { Pokemon } from "./types/pokemon";
import faviPng from "./assets/kmusHead.png";

const LIMIT = 24;

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(async (pageOffset: number, append = false) => {
    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);
      const list = await getPokemonList(pageOffset, LIMIT);
      const details = await Promise.all(
        list.results.map((p) => getPokemonByName(p.name)),
      );
      setTotal(list.count);
      setPokemon((prev) => (append ? [...prev, ...details] : details));
    } catch (err) {
      setError("No se pudieron cargar los Pokémon. Intenta de nuevo.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadPage(0);
  }, [loadPage]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) {
      setOffset(0);
      loadPage(0);
      return;
    }

    try {
      setSearching(true);
      setError(null);
      const results = await searchPokemon(query);
      setPokemon(results);
      setTotal(results.length);
      setOffset(0);
    } catch (err) {
      setError("Error al buscar Pokémon.");
      console.error(err);
    } finally {
      setSearching(false);
    }
  };

  const handleLoadMore = () => {
    const nextOffset = offset + LIMIT;
    setOffset(nextOffset);
    loadPage(nextOffset, true);
  };

  const isSearching = search.trim().length > 0;
  const hasMore = !isSearching && offset + LIMIT < total;

  const stats = useMemo(() => {
    return {
      displayed: pokemon.length,
      total,
    };
  }, [pokemon.length, total]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 h-72 w-72 animate-float rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute right-10 top-40 h-96 w-96 animate-float rounded-full bg-cyan-500/10 blur-3xl [animation-delay:2s]" />
        <div className="absolute bottom-20 left-1/3 h-80 w-80 animate-float rounded-full bg-pink-500/10 blur-3xl [animation-delay:4s]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-3">
              <img
                src={faviPng}
                alt="Pokédex"
                className="h-10 w-10 animate-bounce-slow object-contain drop-shadow-lg sm:h-12 sm:w-12"
              />
              <h1 className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 bg-clip-text text-4xl font-black uppercase italic tracking-tight text-transparent sm:text-6xl">
                Kmus Pokedex
              </h1>
            </div>
            <p className="max-w-2xl text-lg text-slate-300">
              Explora todos los Pokémon con sus sprites animados. Diseño
              vibrante, búsqueda en tiempo real y una experiencia visual única.
            </p>
          </div>

          <form
            onSubmit={handleSearch}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar Pokémon por nombre..."
                className="w-full rounded-full border-2 border-white/10 bg-white/10 px-6 py-3 pl-12 text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all focus:border-cyan-400 focus:bg-white/15 focus:ring-4 focus:ring-cyan-400/20"
              />
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              disabled={searching}
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {searching ? "Buscando..." : "Buscar"}
            </button>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setOffset(0);
                  loadPage(0);
                }}
                className="rounded-full border-2 border-white/10 bg-white/5 px-6 py-3 font-semibold text-slate-300 transition-all hover:bg-white/10"
              >
                Limpiar
              </button>
            )}
          </form>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-400">
            Mostrando <span className="text-cyan-300">{stats.displayed}</span>{" "}
            de <span className="text-pink-300">{stats.total}</span> Pokémon
          </p>
          {!isSearching && (
            <div className="hidden h-2 w-32 overflow-hidden rounded-full bg-white/10 sm:block">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-500"
                style={{
                  width: `${Math.min((stats.displayed / stats.total) * 100, 100)}%`,
                }}
              />
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400" />
            <p className="text-lg font-medium text-slate-300">
              Cargando Pokémon...
            </p>
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-10 text-center text-red-200">
            <p className="text-xl font-bold">{error}</p>
            <button
              onClick={() => loadPage(offset)}
              className="mt-4 rounded-full bg-red-500 px-6 py-2 font-bold text-white transition-all hover:bg-red-600"
            >
              Reintentar
            </button>
          </div>
        ) : pokemon.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-16 text-center">
            <p className="text-2xl font-bold text-slate-300">
              No se encontraron Pokémon
            </p>
            <p className="mt-2 text-slate-400">
              Intenta con otro nombre o limpia la búsqueda.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {pokemon.map((p, i) => (
                <PokemonCard key={p.id} pokemon={p} index={i} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 px-10 py-4 font-black text-white shadow-xl shadow-purple-500/25 transition-all hover:scale-105 hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {loadingMore ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Cargando más...
                      </>
                    ) : (
                      <>
                        Cargar más Pokémon
                        <svg
                          className="h-5 w-5 transition-transform group-hover:translate-y-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-white/5 py-8 text-center text-sm text-slate-400">
        <p>
          2026 - Hecho por{" "}
          <a
            href="https://github.com/KmusDC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:underline"
          >
            Eduardo Kmus
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
