import tw, { css, styled } from 'twin.macro';

const getTypeColors = (name: string): string => {
  const cols: { [key: string]: string } = {
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

type Props = {
  color: string;
};

const TypeBadge = styled.span(({ color }: Props) => [
  tw`rounded-lg text-sm py-1 px-2 font-medium text-white`,
  css`
    background-color: ${getTypeColors(color)};
  `,
]);
export default TypeBadge;
