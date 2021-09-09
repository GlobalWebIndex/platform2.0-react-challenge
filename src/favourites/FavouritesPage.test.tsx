import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../test-utils';
import { server } from '../mocks/server';
import { FavouritesPage } from './FavouritesPage';

describe('Favourites Page', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('loads initial favourite images on load', async () => {
    renderComponent(<FavouritesPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('initially loads the favourite images', async () => {
    renderComponent(<FavouritesPage />);

    const images = await screen.findAllByTestId('image');

    expect(images).toHaveLength(2);
  });

  test('removes a favourite image successfully', async () => {
    renderComponent(<FavouritesPage />);

    const images = await screen.findAllByTestId('image');

    expect(images).toHaveLength(2);

    const [firstImageRemoveButton] = await screen.findAllByRole('button', { name: /Remove/i });

    userEvent.click(firstImageRemoveButton);

    const loading = screen.getByText('Loading...');

    await waitForElementToBeRemoved(loading);

    const imagesAtLast = await screen.findAllByTestId('image');

    expect(imagesAtLast).toHaveLength(1);
  });

  test('displays empty message when no image exists', async () => {
    renderComponent(<FavouritesPage />);

    const [firstImageRemoveButton, secondImageRemoveButton] = await screen.findAllByRole('button', { name: /Remove/i });

    userEvent.click(firstImageRemoveButton);

    const loading = screen.getByText('Loading...');

    await waitForElementToBeRemoved(loading);

    userEvent.click(secondImageRemoveButton);

    const secondLoading = screen.getByText('Loading...');

    await waitForElementToBeRemoved(secondLoading);

    expect(screen.getByText('There are no favourites here.')).toBeInTheDocument();
  });
});
