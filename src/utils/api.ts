import { IPokemon, PokemonListItem } from "@/constants/type.model";

const BASE = "https://pokeapi.co/api/v2";

async function fetchList(limit = 40, offset = 0): Promise<PokemonListItem[]> {
  const r = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  const data = await r.json();
  return data.results;
}

async function fetchPokemon(nameOrId: string | number): Promise<IPokemon> {
  const r = await fetch(`${BASE}/pokemon/${nameOrId}`);
  if (!r.ok) throw new Error("Not found");
  return r.json();
}

export { fetchList, fetchPokemon };
