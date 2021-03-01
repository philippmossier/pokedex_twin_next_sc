import tw from 'twin.macro';
import { ChevronDownSvg } from './Svgs';

type Props = {
  children: string;
  onClick: () => void;
};

const DropDownButton = ({ children, onClick }: Props) => {
  return (
    <button
      onClick={() => onClick()}
      type="button"
      css={[
        tw`text-gray-500 pb-2 bg-white rounded-md inline-flex items-center text-base font-medium`,
        tw`hover:text-gray-900 focus:(outline-none ring-offset-2 ring-gray-500 ring-2)`,
      ]}
      aria-expanded="false"
    >
      <span tw="text-2xl font-bold">{children}</span>
      <ChevronDownSvg />
    </button>
  );
};
export default DropDownButton;
