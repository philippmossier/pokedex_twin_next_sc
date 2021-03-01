import { PokemonSpeciesResponse } from './types/PokemonSpeciesResponse';
import { PokemonDetailsResponse } from './types/PokemonDetailsResponse';
import { EvolutionChainResponse } from './types/EvolutionChainResponse';

type Args = string | string[] | undefined;

export const getListItem = async (id: Args) => {
  const species = (await (fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((value) =>
    value.json(),
  ) as unknown)) as PokemonSpeciesResponse;
  const evoChainUrl = species.evolution_chain.url;

  const [details, evolution] = await Promise.all([
    (fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((value) =>
      value.json(),
    ) as unknown) as PokemonDetailsResponse,
    (fetch(evoChainUrl).then((value) => value.json()) as unknown) as EvolutionChainResponse,
  ]);

  return {
    details,
    species,
    evolution,
  };
};
