import { render, screen } from '@testing-library/react';

import { Favorites } from './Favorites';

describe('Favorites screen', () => {
  const favoritesRequested = jest.fn();
  const deleteFavorite = jest.fn();

  it("will render 'I am Favorites'", () => {
    render(
      <Favorites
        data={{ data: [], status: '', delete: { status: '' } }}
        loading={false}
        favoritesRequested={favoritesRequested}
        deleteFavorite={deleteFavorite}
      />
    );

    const element = screen.getByText('I am Favorites');

    expect(element).toBeTruthy();
  });
});
