/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRedux from './redux/testRenderer';
import App from './App';
import Api from './api';
import mockResponses from './api/__mocks__/mockResponses';

Api.getCats = jest.fn(() => mockResponses.getCatsResponse);
Api.getBreeds = jest.fn(() => mockResponses.getBreedsResponse);
Api.saveFavourite = jest.fn(() => mockResponses.saveFavouriteResponse);

describe('App component', () => {
  afterEach(cleanup);

  it('renders app component', async () => {
    const {
      findByTestId,
      getAllByTestId,
      getByTestId,
      getByText,
    } = renderWithRedux(<App />);
    const catsListContainer = await findByTestId('cats-list-container');
    const breedsContainer = await findByTestId('breeds-container');
    const favouritesContainer = await findByTestId('favourites-container');
    const modal = getByTestId('modal');
    const modalCloseButton = getByTestId('modal-close-button');
    const modalFavouriteIcon = await findByTestId('favourite-icon');
    const tile = getAllByTestId('tile')[0];
    const breedButton = getByText('Abyssinian');

    expect(Api.getCats).toHaveBeenCalledTimes(1);

    expect(catsListContainer).toBeInTheDocument();
    expect(breedsContainer).toBeInTheDocument();
    expect(favouritesContainer).toBeInTheDocument();

    expect(modal).toHaveAttribute('style', 'display: none;');
    fireEvent.click(tile);
    expect(modal).toHaveAttribute('style', 'display: flex;');
    fireEvent.click(modalFavouriteIcon);
    expect(Api.saveFavourite).toHaveBeenCalledTimes(1);
    fireEvent.click(modalCloseButton);
    expect(modal).toHaveAttribute('style', 'display: none;');
    fireEvent.click(breedButton);
    expect(Api.getCats).toHaveBeenCalledTimes(2);
  });
});
