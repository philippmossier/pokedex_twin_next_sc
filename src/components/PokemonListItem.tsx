import React from 'react';
import 'twin.macro';
import { imgUrl } from '../repository/urls';
import { capFirstLetter } from '../utils/capFirstLetter';
import { formatInto3Digits } from '../utils/formatInto3Digits';

type Props = {
  name: string;
  id: string;
  nextJsProps?: () => void;
};

const PokemonListItem = ({ name, id, ...nextJsProps }: Props) => {
  return (
    <a
      {...nextJsProps}
      tw="bg-blue-100 rounded-2xl shadow-md py-1 px-4 text-center focus:outline-none transform transition-transform duration-75 hocus:(scale-105 ring-2 bg-blue-200)"
    >
      <div tw="w-24 h-24 text-center">
        <img tw="mt-1 max-w-full bg-transparent" src={`${imgUrl}/${formatInto3Digits(id)}.png`} />
      </div>

      <div tw="mt-1">
        <span tw="bg-gray-200 rounded-lg text-sm py-1 px-2">{`#${id}`}</span>
        <h3 tw="mt-2 mb-2 tracking-wide font-medium">{capFirstLetter(name)}</h3>
      </div>
    </a>
  );
};

export default PokemonListItem;
