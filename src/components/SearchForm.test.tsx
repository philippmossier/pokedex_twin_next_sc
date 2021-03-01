import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';

it('searchRenderCheck on Navbar', () => {
  const { queryByTitle } = render(<SearchForm />);
  const input = queryByTitle('dummySearch');
  expect(input).toBeTruthy();
});

describe('changeInput on Navbar', () => {
  it('changes the input on searchbar', () => {
    const { queryByTitle } = render(<SearchForm />);
    const input: any = queryByTitle('dummySearch');
    fireEvent.change(input, { target: { value: 'testValue' } });
    expect(input.value).toBe('testValue');
  });
});
