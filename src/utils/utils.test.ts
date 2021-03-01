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
