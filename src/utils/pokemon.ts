import type { Pokemon, PokemonType } from "../types/pokemon";

export const TYPE_COLORS: Record<
  PokemonType,
  { bg: string; border: string; text: string; gradient: string; shadow: string }
> = {
  normal: {
    bg: "bg-stone-400",
    border: "border-stone-300",
    text: "text-stone-900",
    gradient: "from-stone-300 to-stone-500",
    shadow: "rgba(168, 162, 158, 0.35)",
  },
  fire: {
    bg: "bg-orange-500",
    border: "border-orange-300",
    text: "text-orange-950",
    gradient: "from-orange-400 to-red-600",
    shadow: "rgba(249, 115, 22, 0.4)",
  },
  water: {
    bg: "bg-blue-500",
    border: "border-blue-300",
    text: "text-blue-950",
    gradient: "from-blue-400 to-cyan-600",
    shadow: "rgba(59, 130, 246, 0.4)",
  },
  electric: {
    bg: "bg-yellow-400",
    border: "border-yellow-200",
    text: "text-yellow-950",
    gradient: "from-yellow-300 to-amber-500",
    shadow: "rgba(250, 204, 21, 0.45)",
  },
  grass: {
    bg: "bg-green-500",
    border: "border-green-300",
    text: "text-green-950",
    gradient: "from-green-400 to-emerald-600",
    shadow: "rgba(34, 197, 94, 0.4)",
  },
  ice: {
    bg: "bg-cyan-300",
    border: "border-cyan-200",
    text: "text-cyan-950",
    gradient: "from-cyan-200 to-sky-400",
    shadow: "rgba(103, 232, 249, 0.45)",
  },
  fighting: {
    bg: "bg-red-700",
    border: "border-red-500",
    text: "text-white",
    gradient: "from-red-600 to-rose-800",
    shadow: "rgba(185, 28, 28, 0.45)",
  },
  poison: {
    bg: "bg-purple-500",
    border: "border-purple-300",
    text: "text-purple-950",
    gradient: "from-purple-400 to-fuchsia-600",
    shadow: "rgba(168, 85, 247, 0.4)",
  },
  ground: {
    bg: "bg-amber-600",
    border: "border-amber-400",
    text: "text-amber-950",
    gradient: "from-amber-500 to-yellow-700",
    shadow: "rgba(217, 119, 6, 0.4)",
  },
  flying: {
    bg: "bg-sky-400",
    border: "border-sky-200",
    text: "text-sky-950",
    gradient: "from-sky-300 to-indigo-400",
    shadow: "rgba(56, 189, 248, 0.4)",
  },
  psychic: {
    bg: "bg-pink-500",
    border: "border-pink-300",
    text: "text-pink-950",
    gradient: "from-pink-400 to-rose-500",
    shadow: "rgba(236, 72, 153, 0.4)",
  },
  bug: {
    bg: "bg-lime-500",
    border: "border-lime-300",
    text: "text-lime-950",
    gradient: "from-lime-400 to-green-600",
    shadow: "rgba(132, 204, 22, 0.4)",
  },
  rock: {
    bg: "bg-stone-500",
    border: "border-stone-300",
    text: "text-stone-900",
    gradient: "from-stone-400 to-amber-700",
    shadow: "rgba(120, 113, 108, 0.4)",
  },
  ghost: {
    bg: "bg-indigo-600",
    border: "border-indigo-400",
    text: "text-white",
    gradient: "from-indigo-500 to-purple-700",
    shadow: "rgba(79, 70, 229, 0.45)",
  },
  dragon: {
    bg: "bg-violet-600",
    border: "border-violet-400",
    text: "text-white",
    gradient: "from-violet-500 to-fuchsia-700",
    shadow: "rgba(124, 58, 237, 0.45)",
  },
  dark: {
    bg: "bg-neutral-700",
    border: "border-neutral-500",
    text: "text-white",
    gradient: "from-neutral-600 to-slate-800",
    shadow: "rgba(64, 64, 64, 0.5)",
  },
  steel: {
    bg: "bg-slate-400",
    border: "border-slate-200",
    text: "text-slate-900",
    gradient: "from-slate-300 to-zinc-500",
    shadow: "rgba(148, 163, 184, 0.4)",
  },
  fairy: {
    bg: "bg-pink-300",
    border: "border-pink-200",
    text: "text-pink-950",
    gradient: "from-pink-200 to-rose-400",
    shadow: "rgba(249, 168, 212, 0.45)",
  },
};

export const getTypeStyle = (type: string) => {
  return (
    TYPE_COLORS[type as PokemonType] || {
      bg: "bg-gray-400",
      border: "border-gray-300",
      text: "text-gray-900",
      gradient: "from-gray-300 to-gray-500",
      shadow: "rgba(156, 163, 175, 0.35)",
    }
  );
};

export const getPrimaryType = (pokemon: Pokemon) => {
  return pokemon.types[0]?.type.name || "normal";
};

export const getAnimatedSprite = (pokemon: Pokemon): string => {
  const animated =
    pokemon.sprites.versions?.["generation-v"]?.["black-white"]?.animated
      ?.front_default;
  if (animated) return animated;

  const official =
    pokemon.sprites.other?.["official-artwork"]?.front_default;
  if (official) return official;

  return pokemon.sprites.front_default || "";
};

export const formatPokemonId = (id: number) => {
  return `#${String(id).padStart(4, "0")}`;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
