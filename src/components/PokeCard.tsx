import React, { FC } from 'react';
import 'twin.macro';

type Props = {
  name: string;
  id: string;
};

const formatInto3Digits = (id: string | number) => {
  const fourFiveOrSixDigits = '000' + id;
  const threeDigits = fourFiveOrSixDigits.slice(Math.max(fourFiveOrSixDigits.length - 3, 1));
  return threeDigits;
};

const PokeCard: FC<Props> = ({ name, id }) => {
  return (
    <div tw="bg-blue-100 rounded-2xl shadow-md m-4 py-1 px-6 text-center hover:bg-blue-200">
      <div tw="w-28 h-28 text-center">
        <img tw="mt-5 max-w-full bg-transparent" src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatInto3Digits(id)}.png`} />
      </div>

      <div tw="mt-5">
        <span tw="bg-gray-200 rounded-lg text-sm py-1 px-2">{`#${id}`}</span>
        <h3 tw="mt-4 mb-2 tracking-wide uppercase font-medium">{name}</h3>
      </div>
    </div>
  );
};

export default PokeCard;
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
// https://www.serebii.net/pokemon/art/${formatInto3Digits(id)}.png
