import React, { FC, useState } from 'react';
import { useApi } from '../hooks/useApi';
import tw from 'twin.macro';
import NextLink from 'next/link';
import { Pokemon, PokemonResponse } from '../types/PokemonResponse';
import PokeCard from './PokeCard';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

const NextBtn = tw.button`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;
const PreviousBtn = tw.button`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;

// type FormData = {
//   pokemonName: string;
// };

const List: FC = () => {
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=18&offset=0');
  const { state, error, data } = useApi<PokemonResponse>(url);
  const router = useRouter();

  // const { register, handleSubmit } = useForm<FormData>();
  // const onSubmit = handleSubmit(({ pokemonName }) => {
  //   router.push(`/details/${pokemonName.toLowerCase()}`);
  // });

  const getIdFromUrl = (pokemonUrl: string) => pokemonUrl.split('/')[6];

  switch (state) {
    case 'ERROR':
      return (
        <div>
          <p>{error || 'General error'}</p>
          <button onClick={() => router.push('/')}>Back to Home</button>
        </div>
      );

    case 'SUCCESS':
      return (
        <>
          <Navbar />
          <ul tw="flex flex-wrap justify-center max-w-7xl my-0 mx-auto">
            {data.results.map((p: Pokemon) => (
              <NextLink key={p.name} href="/details/[name]" as={`/details/${p.name}`}>
                <a>
                  <PokeCard key={p.name} name={p.name} id={getIdFromUrl(p.url)} />
                </a>
              </NextLink>
            ))}
          </ul>
          <div tw="flex flex-row justify-center items-center mr-auto">
            <PreviousBtn disabled={!data.previous} onClick={() => setUrl(data.previous || url)}>
              previous
            </PreviousBtn>
            <NextBtn disabled={!data.next} onClick={() => setUrl(data.next || url)}>
              next
            </NextBtn>
          </div>
        </>
      );
    default:
      return <div>Loading</div>;
  }
};

export default List;
{
  /* <div key={p.name}>{p.name}</div> */
}
