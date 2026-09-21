export interface PokemonListItem {
  name: string;
  url: string;
}

export interface IPokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": { front_default: string };
      home: { front_default: string };
    };
    front_default: string;
  };
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  base_experience: number;
  forms: { name: string; url: string }[];
}
