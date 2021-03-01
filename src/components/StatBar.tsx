import tw, { css, styled } from 'twin.macro';

const getStatBarColor = (index: number): string => {
  const cols: { [key: string]: string } = {
    '0': '#78C850',
    '1': '#CD5C5C',
    '2': '#808080',
    '3': '#DAA520',
    '4': '#9370DB',
    '5': '#6890F0',
  };
  return cols[index];
};

type Props = {
  index: number;
  barWidth: number;
};

const StatBar = styled.div(({ barWidth, index }: Props) => [
  // common styles
  tw`text-xs leading-none py-1 text-center text-white rounded-tr rounded-br`,
  // non boolean props need to be handled with css tag
  css`
    width: ${barWidth / 2}%;
    background-color: ${getStatBarColor(index)};
  `,
]);
export default StatBar;
