import React from 'react';
import { useRouter } from 'next/router';
import { useApi } from '../../hooks/useApi';
import { PokemonDetailsResponse } from '../../types/PokemonDetailsResponse';
import Navbar from '../../components/Navbar';

const Details: React.FC = () => {
  const router = useRouter();
  const { state, error, data } = useApi<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`);

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
          <div>PokemonDetails:</div>
          <div>{data.types[0].type.name}</div>
          <div>{`weight: ${data.weight}`}</div>
          <button onClick={() => router.push('/')}>Back to Home</button>
        </>
      );
    default:
      return <div>Loading</div>;
  }
};
export default Details;
