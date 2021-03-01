import 'twin.macro';
import HomeButton from './HomeButton';
import SearchForm from './SearchForm';
import { SearchSvg } from './Svgs';

const Navbar = () => {
  return (
    <nav tw="bg-gray-800">
      <div tw="max-w-6xl mx-auto">
        <div tw="relative flex items-center justify-between h-16">
          <HomeButton />
          <h1 tw="hidden lg:block text-white text-3xl font-bold text-center opacity-50">Pokedex</h1>
          <div tw="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div tw="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" tw="sr-only">
                Search
              </label>
              <div tw="relative">
                <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchSvg />
                </div>
                <SearchForm isNavbar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
