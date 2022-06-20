import { MemoryRouter } from 'react-router-dom';
import { screen, render } from '@testing-library/react';

import { IBreed } from 'features/breeds/types';
import BreedsList from './BreedsList';

describe('BreedsList component', () => {
  const mockedBreeds = [
    {
      id: '123',
      description: 'description1',
      temperament: 'temperament1',
    },
    {
      id: '456',
      description: 'description2',
      temperament: 'temperament2',
    },
  ];

  it("will render 'description1 and temperament1'", () => {
    render(<BreedsList breeds={mockedBreeds as IBreed[]} />, {
      wrapper: MemoryRouter,
    });

    const element1 = screen.getByText('description1');
    const element2 = screen.getByText('temperament1');

    expect(element1).toBeTruthy();
    expect(element2).toBeTruthy();
  });

  it("will render 'description2 and temperament2'", () => {
    render(<BreedsList breeds={mockedBreeds as IBreed[]} />, {
      wrapper: MemoryRouter,
    });

    const element1 = screen.getByText('description2');
    const element2 = screen.getByText('temperament2');

    expect(element1).toBeTruthy();
    expect(element2).toBeTruthy();
  });
});
