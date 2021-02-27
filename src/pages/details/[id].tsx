import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { PokemonDetailsResponse } from '../../types/PokemonDetailsResponse';
import { PokemonSpeciesResponse } from '../../types/PokemonSpeciesResponse';
import { EvolutionChainResponse } from '../../types/EvolutionChainResponse';
import { capFirstLetter } from '../../utils/capFirstLetter';
import { formatInto3Digits } from '../../utils/formatInto3Digits';
import DataLoader from '../../components/DataLoader';
import { useRouter } from 'next/router';
import tw, { css, styled } from 'twin.macro';

const getBarColors = (index: number): string => {
  type KeyValuePair = {
    [key: string]: string;
  };
  const cols: KeyValuePair = {
    '0': '#78C850',
    '1': '#CD5C5C',
    '2': '#808080',
    '3': '#DAA520',
    '4': '#9370DB',
    '5': '#6890F0',
  };
  return cols[index];
};
const getTypeColors = (name: string): string => {
  type KeyValuePair = {
    [key: string]: string;
  };
  const cols: KeyValuePair = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return cols[name];
};

type StatsBarProps = {
  index: number;
  barWidth: number;
};

const StatsBar = styled.div(({ barWidth, index }: StatsBarProps) => [
  // common styles
  tw`text-xs leading-none py-1 text-center text-white rounded-tr rounded-br`,
  // non boolean props need to be handled with css tag
  css`
    width: ${barWidth}%;
    background-color: ${getBarColors(index)};
  `,
]);

type TypeBadgeProps = {
  color: string;
};

const TypeBadge = styled.span(({ color }: TypeBadgeProps) => [
  // common styles
  tw`rounded-lg text-sm py-1 px-2 font-medium text-white
`,

  // non boolean props need to be handled with css tag
  css`
    background-color: ${color};
  `,
]);

const Details: React.FC = () => {
  const { query, isReady } = useRouter();
  const [movesVisible, setMovesVisible] = useState(false);

  const getDetailsSpeciesEvolution = async () => {
    const species = (await (fetch(`https://pokeapi.co/api/v2/pokemon-species/${query.id}`).then((value) => value.json()) as unknown)) as PokemonSpeciesResponse;
    const evoChainUrl = species.evolution_chain.url;

    const [details, evolution] = await Promise.all([
      (fetch(`https://pokeapi.co/api/v2/pokemon/${query.id}`).then((value) => value.json()) as unknown) as PokemonDetailsResponse,
      (fetch(evoChainUrl).then((value) => value.json()) as unknown) as EvolutionChainResponse,
    ]);

    return {
      details,
      species,
      evolution,
    };
  };

  if (isReady) {
    return (
      <DataLoader fetchData={() => getDetailsSpeciesEvolution()} dependency={[query.id]}>
        {(data) => {
          console.log('data', data);
          return (
            <>
              <Navbar />

              <main tw="flex flex-col items-center justify-center m-auto pt-4">
                <div tw="text-3xl flex items-center flex-row content-center">
                  <h1 tw="pb-1">{capFirstLetter(data.details.name)}</h1>
                  <span tw="text-gray-400 ml-2">{`#${data.details.id}`}</span>
                </div>

                <div>
                  <div tw="m-auto w-60 h-60 text-center">
                    <img tw="mt-1 max-w-full bg-transparent" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatInto3Digits(data.details.id)}.png`} />
                  </div>

                  <table tw="min-w-full">
                    {/* <h1 tw="text-2xl font-bold">Data:</h1> */}
                    <tbody tw="text-left">
                      <tr tw="">
                        <th>Abilities</th>
                        {data.details.abilities.map((ab) => (
                          <td tw="px-3" key={ab.ability.name}>
                            {ab.ability.name}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th>Type</th>

                        {data.details.types.map((ty) => (
                          <td tw="px-3" key={ty.type.name}>
                            <TypeBadge color={getTypeColors(ty.type.name)}>{ty.type.name}</TypeBadge>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <th>Possible Evolutions</th>
                        {data.evolution.chain.evolves_to.length && data.details.name === data.evolution.chain.species.name ? (
                          <>
                            <td tw="px-3">{data.evolution.chain.evolves_to[0].species.name}</td>
                            <td tw="px-3">{data.evolution.chain.evolves_to[0].evolves_to[0]?.species.name}</td>
                          </>
                        ) : null}
                        {data.evolution.chain.evolves_to.length && data.details.name === data.evolution.chain.evolves_to[0].species.name ? (
                          <>
                            <td tw="px-3">{data.evolution.chain.evolves_to[0].evolves_to[0]?.species.name}</td>
                          </>
                        ) : null}
                      </tr>
                    </tbody>
                  </table>

                  <div tw="pt-2">
                    {/* <h1 tw="text-2xl font-bold">Stats:</h1> */}
                    {data.details.stats.map((st, index) => (
                      <div tw="text-left font-bold capitalize" key={st.stat.name}>
                        <div tw="pb-1">{st.stat.name}</div>

                        <StatsBar barWidth={st.base_stat / 2} index={index}>
                          {st.base_stat}
                        </StatsBar>
                      </div>
                    ))}
                  </div>

                  <div tw="pt-2">
                    <h1 tw="text-2xl font-bold">
                      <button
                        onClick={() => setMovesVisible(!movesVisible)}
                        type="button"
                        tw="text-gray-500  bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        aria-expanded="false"
                      >
                        <span tw="text-2xl font-bold">Moves</span>
                        <svg tw="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </h1>
                    {movesVisible && (
                      <ul tw="flex flex-col flex-wrap h-full md:h-screen">
                        {data.details.moves.map((mo) => (
                          <li tw="px-1 border-solid" key={mo.move.name}>
                            {mo.move.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </main>
            </>
          );
        }}
      </DataLoader>
    );
  }
  return null;
};
export default Details;
