import { screen, render } from '@testing-library/react';
import { IBreed } from 'features/breeds/types';

import BreedItem from './BreedItem';

describe('Favorites screen', () => {
  const onSelect = jest.fn();
  const mockedBreed = {
    id: '123',
    description: 'description',
    temperament: 'temperament',
  };

  it("will render 'description'", () => {
    render(<BreedItem onSelect={onSelect} breed={mockedBreed as IBreed} />);

    const element = screen.getByText('description');

    expect(element).toBeTruthy();
  });

  it("will render 'temperament'", () => {
    render(<BreedItem onSelect={onSelect} breed={mockedBreed as IBreed} />);

    const element = screen.getByText('temperament');

    expect(element).toBeTruthy();
  });
});
