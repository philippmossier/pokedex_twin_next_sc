export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type Pokemon = {
  name: string;
  url: string;
};
