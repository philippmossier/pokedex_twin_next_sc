import { useState } from 'react';
import { Pokemon } from '../repository/types/PokemonResponse';
import Navbar from '../components/Navbar';
import PaginationButton from '../components/PaginationButton';
import PokemonListItem from '../components/PokemonListItem';
import Link from '../components/Link';
import DataLoader from '../components/DataLoader';
import { getIdFromUrl } from '../utils/getIdFromUrl';
import { handleNextPage, handlePrevPage } from '../utils/pagination';
import { getList } from '../repository/getList';
import { page1 } from '../repository/urls';
import { ButtonContainer, PokemonList } from '../styles/IndexPage.styles';

const Index = () => {
  const [url, setUrl] = useState(page1);

  return (
    <DataLoader fetchData={() => getList(url)} dependency={[url]}>
      {(data) => {
        const firstPage = data.previous === null;
        const lastPage = data.next.includes('offset=898');

        return (
          <>
            <Navbar />

            <PokemonList>
              {data.results.map((p: Pokemon) => (
                <Link passHref key={p.name} href="/details/[id]" as={`/details/${getIdFromUrl(p.url)}`}>
                  <PokemonListItem key={p.name} name={p.name} id={getIdFromUrl(p.url)} />
                </Link>
              ))}
            </PokemonList>

            <ButtonContainer>
              <PaginationButton disabled={firstPage} onClick={() => setUrl(handlePrevPage(data.previous))}>
                previous
              </PaginationButton>
              <PaginationButton disabled={lastPage} onClick={() => setUrl(handleNextPage(data.next))}>
                next
              </PaginationButton>
            </ButtonContainer>
          </>
        );
      }}
    </DataLoader>
  );
};

export default Index;
