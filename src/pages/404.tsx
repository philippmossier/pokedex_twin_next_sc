import { useRouter } from 'next/router';
import 'twin.macro';
import SearchForm from '../components/SearchForm';
import { SearchSvg, ExclamationSvg } from '../components/Svgs';

const ErrorPage = () => {
  const router = useRouter();

  return (
    <main tw="flex items-center justify-center h-screen bg-gray-700 text-gray-400">
      <div tw="p-4 space-y-4">
        <div tw="flex flex-col items-center space-y-3 sm:flex-row sm:space-y-0 sm:items-center sm:space-x-3">
          <p tw="font-semibold text-red-500 text-9xl">404</p>
          <div tw="space-y-2">
            <h1 id="pageTitle" tw="flex items-center justify-center md:justify-start space-x-2">
              <ExclamationSvg />
              <span tw="text-xl font-medium sm:text-2xl text-gray-400">Oops! Page not found.</span>
            </h1>
            <p tw="text-base font-normal text-gray-300 text-center md:text-left">
              The page you are looking for was not found.
            </p>
            <p tw="text-base font-normal text-gray-300 text-center md:text-left">
              You may return to{' '}
              <button onClick={() => router.push('/')} tw="hover:underline text-blue-500">
                home page
              </button>
              <span> or try using searching form</span>
            </p>
          </div>
        </div>

        <div tw="max-w-lg w-full flex items-center md:items-end justify-center md:justify-end">
          <label htmlFor="search" tw="sr-only">
            Search
          </label>
          <div tw="relative">
            <div tw="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchSvg />
            </div>
            <SearchForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
