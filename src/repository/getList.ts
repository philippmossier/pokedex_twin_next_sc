import { PokemonResponse } from '../types/PokemonResponse';

export const getList = async (url) => {
  const pokemon = (await fetch(url).then((response) => response.json() as unknown)) as PokemonResponse;
  return pokemon;
};
