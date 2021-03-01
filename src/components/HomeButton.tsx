import 'twin.macro';
import NextLink from 'next/link';
import { HomeSvg } from './Svgs';

const HomeButton = () => (
  <div tw="px-2">
    <NextLink href="/" passHref>
      <a tw="w-8 h-8 text-white opacity-50 hover:opacity-100 relative block">
        <HomeSvg />
      </a>
    </NextLink>
  </div>
);

export default HomeButton;
