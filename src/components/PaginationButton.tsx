import tw, { styled } from 'twin.macro';

type Props = {
  disabled: boolean;
};

const PaginationButton = styled.button(({ disabled }: Props) => [
  tw`text-lg px-4 py-2 rounded-lg bg-gray-700 text-white border-black`,
  tw`focus:outline-none transform transition-transform duration-75`,

  disabled && tw`opacity-30`,
  !disabled && tw`hocus:(scale-105 bg-gray-600) focus:(ring-2 ring-offset-2 ring-gray-600)`,
]);

export default PaginationButton;
