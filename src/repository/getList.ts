import { PokemonResponse } from './types/PokemonResponse';

export const getList = async (url: string) => {
  const pokemon = (await fetch(url).then((response) => response.json() as unknown)) as PokemonResponse;
  return pokemon;
};
