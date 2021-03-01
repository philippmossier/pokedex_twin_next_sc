import React, { FC, useState } from 'react';
import 'twin.macro';
import { Pokemon } from '../types/PokemonResponse';
import Navbar from '../components/Navbar';
import PaginationButton from '../components/PaginationButton';
import Pokecard from '../components/Pokecard';
import Link from '../components/Link';
import DataLoader from '../components/DataLoader';
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { handleNextPage, handlePrevPage } from '../utils/pagination';
import { getList } from '../repository/getList';
import { page1 } from '../repository/constants';

// const NextBtn = tw.PaginationButton`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;
// const PreviousBtn = tw.PaginationButton`bg-red-400 text-black rounded-md py-2 px-4 mt-4`;

const Index: FC = () => {
  const [url, setUrl] = useState(page1);

  return (
    <DataLoader fetchData={() => getList(url)} dependency={[url]}>
      {(data) => {
        const firstPage = data.previous === null;
        const lastPage = data.next.includes('offset=898');

        return (
          <>
            <Navbar />
            <ul tw="flex flex-wrap justify-center max-w-6xl mx-auto gap-6 pt-4 px-2">
              {data.results.map((p: Pokemon) => (
                <Link title="cardLink" passHref key={p.name} href="/details/[id]" as={`/details/${getIdFromUrl(p.url)}`}>
                  <Pokecard key={p.name} name={p.name} id={getIdFromUrl(p.url)} />
                </Link>
              ))}
            </ul>
            <div tw="flex flex-row justify-center items-center mr-auto gap-4 pt-4">
              <PaginationButton disabled={firstPage} onClick={() => setUrl(handlePrevPage(data.previous))}>
                previous
              </PaginationButton>
              <PaginationButton disabled={lastPage} onClick={() => setUrl(handleNextPage(data.next))}>
                next
              </PaginationButton>
            </div>
          </>
        );
      }}
    </DataLoader>
  );
};

export default Index;
