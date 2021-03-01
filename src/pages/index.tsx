import React, { FC, useState } from 'react';
import 'twin.macro';
import { Pokemon, PokemonResponse } from '../types/PokemonResponse';
import Navbar from '../components/Navbar';
import ButtonExample from '../components/example/ButtonExample';
import Pokecard from '../components/Pokecard';
import Link from '../components/Link';
import DataLoader from '../components/DataLoader';
import { getIdFromUrl } from '../utils/getIdFromUrl';

// const NextBtn = tw.button`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;
// const PreviousBtn = tw.button`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;

const Index: FC = () => {
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=28&offset=0');

  const getList = async () => {
    const pokemon = (await fetch(url).then((response) => response.json() as unknown)) as PokemonResponse;
    return pokemon;
  };

  return (
    <DataLoader fetchData={() => getList()} dependency={[url]}>
      {(data) => {
        return (
          <>
            <Navbar />
            <ul tw="flex flex-wrap justify-center max-w-6xl mx-auto gap-6 pt-4 px-2">
              {data.results.map((p: Pokemon) => (
                <Link title="cardLink" passHref key={p.name} href="/details/[id]" as={`/details/${getIdFromUrl(p.url)}`}>
                  <Pokecard key={p.name} name={p.name} id={getIdFromUrl(p.url)} />
                </Link>
              ))}
            </ul>
            <div tw="flex flex-row justify-center items-center mr-auto gap-4 pt-4">
              <ButtonExample isPrimary disabled={!data.previous} onClick={() => setUrl(data.previous || url)}>
                previous
              </ButtonExample>
              <ButtonExample isPrimary disabled={!data.next} onClick={() => setUrl(data.next || url)}>
                next
              </ButtonExample>
            </div>
          </>
        );
      }}
    </DataLoader>
  );
};

export default Index;
