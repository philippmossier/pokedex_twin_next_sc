export const handleNextPage = (nextLink: string): string => {
  if (nextLink === 'https://pokeapi.co/api/v2/pokemon?offset=896&limit=28') {
    return 'https://pokeapi.co/api/v2/pokemon?offset=896&limit=2';
  } else {
    return nextLink;
  }
};
export const handlePrevPage = (nextLink: string): string => {
  if (nextLink === 'https://pokeapi.co/api/v2/pokemon?offset=894&limit=2') {
    return 'https://pokeapi.co/api/v2/pokemon?offset=868&limit=28';
  } else {
    return nextLink;
  }
};
