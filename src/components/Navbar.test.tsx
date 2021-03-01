import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NavBar from './Navbar';

it('searchRenderCheck on Navbar', () => {
  const { queryByTitle } = render(<NavBar />);
  const input = queryByTitle('dummySearch');
  expect(input).toBeTruthy();
});

describe('changeInput on Navbar', () => {
  it('changes the input on searchbar', () => {
    const { queryByTitle } = render(<NavBar />);
    const input: any = queryByTitle('dummySearch');
    fireEvent.change(input, { target: { value: 'testValue' } });
    expect(input.value).toBe('testValue');
  });
});
