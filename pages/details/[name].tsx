import React from 'react';
import { useRouter } from 'next/router'
import { useApi } from '../../hooks/useApi';
import { PokemonDetailsResponse } from '../../types/PokemonDetailsResponse';

const Details: React.FC<{}> = ({}) => {
	const router = useRouter();
	const { state, error, data } = useApi<PokemonDetailsResponse>(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`);
 console.log('router', router)
	switch(state){
		case 'ERROR':
      return <p>ERROR: {error || 'General error'}</p>;
    case 'SUCCESS':
      return (
        <>
						<div>PokemonDetails:</div>
						<div>{data.types[0].type.name}</div>
						<div>{`weight: ${data.weight}`}</div>
            <button onClick={()=> router.back()}>back</button>
        </>
      );
    default:
      return <div>Loading</div>;
  }
};
export default Details;
