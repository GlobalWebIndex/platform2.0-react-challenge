/* eslint-disable no-undef */
import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRedux from '../../redux/testRenderer';
import Favourites from './favourites';
import Api from '../../api';
import mockResponses from '../../api/__mocks__/mockResponses';

Api.getFavourites = jest.fn(() => mockResponses.getFavouritesResponse);
Api.deleteFavourite = jest.fn(() => mockResponses.deleteFavouriteResponse);


describe('Render favourites component', () => {
  afterEach(cleanup);
  it('renders and handles deletion', async () => {
    const { getAllByTestId, findByTestId, findAllByTestId } = renderWithRedux(<Favourites />);
    expect(await findByTestId('favourites')).toBeInTheDocument();
    expect(await findAllByTestId('favourite')).toHaveLength(2);
    fireEvent.click(getAllByTestId('delete-icon')[0]);
    expect(Api.deleteFavourite).toHaveBeenCalled();
    expect(await findAllByTestId('favourite')).toHaveLength(1);
  });
});
