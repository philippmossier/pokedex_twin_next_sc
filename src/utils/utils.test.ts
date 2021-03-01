import { handleNextPage, handlePrevPage } from './pagination';
import { getIdFromUrl } from './getIdFromUrl';
import { formatInto3Digits } from './formatInto3Digits';
import { capFirstLetter } from './capFirstLetter';

test('capFirstLetter', () => {
  expect(capFirstLetter('simon')).toBe('Simon');
  expect(capFirstLetter('cInDaRellA')).toBe('CInDaRellA');
});

test('formatInto3Digits', () => {
  expect(formatInto3Digits(1)).toBe('001');
  expect(formatInto3Digits(11)).toBe('011');
  expect(formatInto3Digits(101)).toBe('101');
  expect(formatInto3Digits('1')).toBe('001');
  expect(formatInto3Digits('11')).toBe('011');
  expect(formatInto3Digits('101')).toBe('101');
});

test('getIdFromUrl', () => {
  expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/1/')).toBe('1');
  expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/10')).toBe('10');
  expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/101/')).toBe('101');
});

test('changePagination URL only when necessary', () => {
  expect(handleNextPage('https://pokeapi.co/api/v2/pokemon?offset=896&limit=28')).toBe('https://pokeapi.co/api/v2/pokemon?offset=896&limit=2');
  expect(handleNextPage('https://staysTheSame')).toBe('https://staysTheSame');
  expect(handlePrevPage('https://pokeapi.co/api/v2/pokemon?offset=894&limit=2')).toBe('https://pokeapi.co/api/v2/pokemon?offset=868&limit=28');
  expect(handlePrevPage('https://staysAlsoTheSame')).toBe('https://staysAlsoTheSame');
});
