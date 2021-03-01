import tw, { styled } from 'twin.macro';

type PaginationButtonProps = {
  disabled: boolean;
};

const PaginationButton = styled.button(({ disabled }: PaginationButtonProps) => [
  tw`text-lg px-4 py-2 rounded-lg bg-gray-700 text-white border-black`,
  tw`focus:outline-none transform transition-transform duration-75`,

  disabled && tw`opacity-50`,
  !disabled && tw`hocus:(scale-105 text-blue-300)`,
]);

export default PaginationButton;
