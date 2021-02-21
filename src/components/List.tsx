import React, { FC, useState } from 'react';
import { useApi } from '../hooks/useApi';
import tw from 'twin.macro';
import NextLink from 'next/link';
import { Pokemon, PokemonResponse } from '../types/PokemonResponse';
import PokeCard from './PokeCard';
import { useForm } from 'react-hook-form';

const NextBtn = tw.button`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;
const PreviousBtn = tw.button`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;

type FormData = {
  pokemonName: string;
};

const List: FC = () => {
  const [url, setUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  const { state, error, data } = useApi<PokemonResponse>(url);
  const getIdFromUrl = (pokemonUrl: string) => pokemonUrl.split('/')[6];
  const [searching, setSearching] = useState(false);

  const { register, setValue, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit(({ pokemonName }) => {
    console.log(pokemonName);
    const inputUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    setSearching(!searching);
    setUrl(inputUrl);
  }); // firstName and lastName will have correct type

  console.log('data:', data);

  switch (state) {
    case 'ERROR':
      return <p>ERROR: {error || 'General error'}</p>;
    case 'SUCCESS':
      return (
        <>
          <form onSubmit={onSubmit}>
            <label>Search Pokemon by name:</label>
            <input name="pokemonName" ref={register} />
            <button type="submit" onClick={() => console.log('clicked submit')}>
              submit
            </button>
          </form>
          {searching ? (
            <div>{`id: ${data.id}`}</div>
          ) : (
            <ul tw="flex flex-wrap justify-center max-w-max my-0 mx-auto">
              {data.results.map((p: Pokemon) => (
                <NextLink key={p.name} href="/details/[name]" as={`/details/${p.name}`}>
                  <a>
                    <PokeCard key={p.name} name={p.name} id={getIdFromUrl(p.url)} />
                  </a>
                </NextLink>
              ))}
            </ul>
          )}

          <NextBtn disabled={!data.next} onClick={() => setUrl(data.next || url)}>
            next
          </NextBtn>
          <PreviousBtn disabled={!data.previous} onClick={() => setUrl(data.previous || url)}>
            previous
          </PreviousBtn>
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
