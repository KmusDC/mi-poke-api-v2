import axios from "axios";
import type { Pokemon, PokemonListResponse } from "../types/pokemon";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 15000,
});

export const getPokemonList = async (
  offset = 0,
  limit = 24
): Promise<PokemonListResponse> => {
  const { data } = await api.get<PokemonListResponse>(
    `/pokemon?offset=${offset}&limit=${limit}`
  );
  return data;
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
  const { data } = await api.get<Pokemon>(`/pokemon/${name}`);
  return data;
};

export const searchPokemon = async (query: string): Promise<Pokemon[]> => {
  const list = await getPokemonList(0, 1302);
  const normalized = query.toLowerCase().trim();
  const matches = list.results.filter((p) => p.name.includes(normalized));

  const details = await Promise.all(
    matches.map((p) => getPokemonByName(p.name))
  );
  return details;
};
