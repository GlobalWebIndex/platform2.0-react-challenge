import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { ImagesPage } from './ImagesPage';
import { renderComponent } from '../test-utils';
import { server } from '../mocks/server';

describe('Images Page', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('renders successfully', () => {
    renderComponent(<ImagesPage />);

    const loadMoreButton = screen.getByTestId('load-more-button');

    expect(loadMoreButton).toBeInTheDocument();
  });

  test('loads initial images on load', async () => {
    renderComponent(<ImagesPage />);

    const images = await screen.findAllByTestId('image');

    expect(images).toHaveLength(10);
  });

  test('loads additional images after clicking "Load more" button', async () => {
    renderComponent(<ImagesPage />);

    await waitFor(() => screen.getAllByTestId('image'));

    expect(screen.getAllByTestId('image')).toHaveLength(10);

    const loadMoreButton = screen.getByTestId('load-more-button');

    fireEvent.click(loadMoreButton);

    expect(loadMoreButton).toBeDisabled();

    await waitFor(() => expect(loadMoreButton).not.toBeDisabled());

    expect(screen.getAllByTestId('image')).toHaveLength(20);
  });

  test('opens details modal for an image', async () => {
    renderComponent(<ImagesPage />);

    const images = await screen.findAllByTestId('image');

    fireEvent.click(images[0]);

    const modal = await screen.findByRole('dialog');

    expect(modal).toBeInTheDocument();
  });
});
