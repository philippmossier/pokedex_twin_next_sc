import { useForm } from 'react-hook-form';
import 'twin.macro';
import HomeButton from './HomeButton';
import SearchIcon from './SearchIcon';
import { useRouter } from 'next/router';

type FormData = {
  pokemonName: string;
};

const Navbar = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = handleSubmit(({ pokemonName }) => {
    router.push(`/details/${pokemonName.toLowerCase()}`);
  });
  return (
    <nav tw="bg-gray-800">
      <div tw="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
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
                  <SearchIcon />
                </div>
                <form onSubmit={onSubmit}>
                  <input
                    tw="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                    required
                    name="pokemonName"
                    ref={register}
                    placeholder="Search by Name or Id"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
