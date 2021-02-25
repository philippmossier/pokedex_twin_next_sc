import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import 'twin.macro';
import { PokemonDetailsResponse } from '../../types/PokemonDetailsResponse';
import { PokemonSpeciesResponse } from '../../types/PokemonSpeciesResponse';
import { EvolutionChainResponse } from '../../types/EvolutionChainResponse';
import { capFirstLetter } from '../../utils/capFirstLetter';
import { formatInto3Digits } from '../../utils/formatInto3Digits';
import DataLoader from '../../components/DataLoader';
import { useRouter } from 'next/router';

type Data = [PokemonDetailsResponse, PokemonSpeciesResponse | [], EvolutionChainResponse | []];

const Details: React.FC = () => {
  const router = useRouter();

  const getDetailsSpeciesEvolution = async () => {
    const species = (await (fetch(`https://pokeapi.co/api/v2/pokemon-species/${router.query.id}`).then((value) => value.json()) as unknown)) as PokemonSpeciesResponse;
    const evoChainUrl = species.evolution_chain.url;
    const [details, evolution] = await Promise.all([
      (fetch(`https://pokeapi.co/api/v2/pokemon/${router.query.id}`).then((value) => value.json()) as unknown) as PokemonDetailsResponse,
      (fetch(evoChainUrl).then((value) => value.json()) as unknown) as EvolutionChainResponse,
    ]);

    return {
      details,
      species,
      evolution,
    };
  };

  return (
    <DataLoader fetchData={() => getDetailsSpeciesEvolution()} dependency={[router.query.id]}>
      {(data) => {
        console.log('data', data);

        return (
          <>
            <Navbar />
            <div tw="flex flex-col items-center">
              <div tw="text-3xl flex items-center flex-row content-center">
                <h1 tw="pb-1">{capFirstLetter(data.details.name)}</h1>
                <span tw="text-gray-400 ml-2">{`#${data.details.id}`}</span>
              </div>

              <div tw="w-24 h-24 text-center">
                <img tw="mt-1 max-w-full bg-transparent" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatInto3Digits(data.details.id)}.png`} />
              </div>

              <div>
                <h2>Type</h2>
                {data.details.types.map((type) => (
                  <span tw="pl-2" key={type.type.name}>
                    {type.type.name}
                  </span>
                ))}
              </div>

              <div>
                <h2>Stats</h2>
                {data.details.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <span tw="pl-2">{stat.stat.name}</span>
                    <span tw="pl-2">{stat.base_stat}</span>
                  </div>
                ))}
              </div>

              <div>
                <h2>Evolutions:</h2>
                {data.evolution.chain.evolves_to.length && data.details.name === data.evolution.chain.species.name ? (
                  <div key={data.evolution.id}>
                    <span tw="pl-2">{data.evolution.chain.evolves_to[0].species.name}</span>
                    <span tw="pl-2">{data.evolution.chain.evolves_to[0].evolves_to[0]?.species.name}</span>
                  </div>
                ) : null}
                {data.evolution.chain.evolves_to.length && data.details.name === data.evolution.chain.evolves_to[0].species.name ? (
                  <div key={data.evolution.id}>
                    <span tw="pl-2">{data.evolution.chain.evolves_to[0].evolves_to[0]?.species.name}</span>
                  </div>
                ) : null}
              </div>

              <div>
                <h2>Moves</h2>
                {data.details.moves.map((move) => (
                  <div key={move.move.name}>
                    <span tw="pl-2">{move.move.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      }}
    </DataLoader>
  );
};
export default Details;
