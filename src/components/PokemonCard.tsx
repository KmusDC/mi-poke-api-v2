import { useState } from "react";
import type { Pokemon } from "../types/pokemon";
import {
  capitalize,
  formatPokemonId,
  getAnimatedSprite,
  getPrimaryType,
  getTypeStyle,
} from "../utils/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  index: number;
}

export const PokemonCard = ({ pokemon, index }: PokemonCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const primaryType = getPrimaryType(pokemon);
  const typeStyle = getTypeStyle(primaryType);
  const sprite = getAnimatedSprite(pokemon);
  const isAnimated = sprite.includes("animated");

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border-2 ${typeStyle.border} bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up`}
      style={{
        animationDelay: `${Math.min(index * 50, 800)}ms`,
        boxShadow: isHovered ? `0 25px 50px -12px ${typeStyle.shadow}` : undefined,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${typeStyle.gradient} opacity-10 transition-opacity duration-300 group-hover:opacity-25`}
      />

      <div className="relative flex flex-col items-center p-5">
        <span
          className={`absolute right-3 top-3 text-xs font-black ${typeStyle.text} opacity-60`}
        >
          {formatPokemonId(pokemon.id)}
        </span>

        <div
          className={`relative mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br ${typeStyle.gradient} p-1 shadow-inner transition-transform duration-300 group-hover:scale-110`}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-white/90">
            {!imageLoaded && (
              <div className="absolute h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-current text-gray-400" />
            )}
            <img
              src={sprite}
              alt={pokemon.name}
              className={`h-28 w-28 object-contain transition-all duration-300 ${
                isAnimated && isHovered ? "scale-110 drop-shadow-lg" : ""
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>

          {isAnimated && (
            <div className="absolute -bottom-1 right-0 rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              Animado
            </div>
          )}
        </div>

        <h2 className="text-center text-lg font-black capitalize text-slate-800">
          {capitalize(pokemon.name)}
        </h2>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {pokemon.types.map(({ type }) => {
            const style = getTypeStyle(type.name);
            return (
              <span
                key={type.name}
                className={`rounded-full ${style.bg} px-3 py-1 text-xs font-bold uppercase tracking-wide ${style.text} shadow-sm`}
              >
                {type.name}
              </span>
            );
          })}
        </div>

        <div className="mt-4 grid w-full grid-cols-2 gap-2 text-center text-xs text-slate-500">
          <div className="rounded-xl bg-slate-100 py-2">
            <span className="block font-bold text-slate-700">
              {pokemon.height / 10}m
            </span>
            Altura
          </div>
          <div className="rounded-xl bg-slate-100 py-2">
            <span className="block font-bold text-slate-700">
              {pokemon.weight / 10}kg
            </span>
            Peso
          </div>
        </div>
      </div>
    </article>
  );
};
