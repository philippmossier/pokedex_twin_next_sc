import React from 'react';
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
    '0': '#90EE90',
    '1': '#CD5C5C',
    '2': '#808080',
    '3': '#DAA520',
    '4': '#9370DB',
    '5': '#48D1CC',
  };
  return cols[index];
};

type StatsBarProps = {
  index: number;
  barWidth: number;
};

const StatsBar = styled.div(({ barWidth, index }: StatsBarProps) => [
  // common styles
  tw`text-xs leading-none py-1 text-center text-white`,
  // non boolean props need to be handled with css tag
  css`
    width: ${barWidth}%;
    background-color: ${getBarColors(index)};
  `,
]);

const Details: React.FC = () => {
  const { query, isReady } = useRouter();

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
          const collapseMoves = false;
          return (
            <>
              <Navbar />

              <div tw="flex flex-col items-center max-w-6xl justify-center m-auto border-2">
                <div tw="text-3xl flex items-center flex-row content-center border-2">
                  <h1 tw="pb-1">{capFirstLetter(data.details.name)}</h1>
                  <span tw="text-gray-400 ml-2">{`#${data.details.id}`}</span>
                </div>

                <div tw="border-2">
                  <div tw="m-auto w-60 h-60 text-center border-2">
                    <img tw="mt-1 max-w-full bg-transparent" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatInto3Digits(data.details.id)}.png`} />
                  </div>

                  <table tw="border-2">
                    <h1 tw="text-2xl font-bold">Data:</h1>
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
                            {ty.type.name}
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

                  <div tw="border-2">
                    <h1 tw="text-2xl font-bold">Stats:</h1>
                    {data.details.stats.map((st, index) => (
                      <div tw="text-left" key={st.stat.name}>
                        <div>{st.stat.name}</div>

                        <StatsBar barWidth={st.base_stat / 2} index={index}>
                          {st.base_stat}
                        </StatsBar>
                      </div>
                    ))}
                  </div>
                  {/* <table tw="bg-green-200">
                    <h1 tw="text-2xl font-bold">Stats:</h1>
                    {data.details.stats.map((st) => (
                      <tr tw="text-left" key={st.stat.name}>
                        <th>{st.stat.name}</th>
                        <td>{st.base_stat}</td>
                      </tr>
                    ))}
                  </table> */}

                  <div tw="border-4">
                    <h1 tw="text-2xl font-bold">Moves:</h1>
                    <div tw="flex flex-wrap">
                      {!collapseMoves &&
                        data.details.moves.map((mo) => (
                          <p tw="px-2 border-solid border-2" key={mo.move.name}>
                            {mo.move.name}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </DataLoader>
    );
  }
  return null;
};
export default Details;
