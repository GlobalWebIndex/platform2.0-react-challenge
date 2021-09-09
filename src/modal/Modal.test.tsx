import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../test-utils';
import { server } from '../mocks/server';
import { Modal } from './Modal';

describe('Modal', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('renders successfully', () => {
    renderComponent(<Modal isOpen fallbackUrl="" />);

    const title = screen.getByText('Image Details');

    expect(title).toBeInTheDocument();
  });

  test('should give the option to favourite an image', async () => {
    renderComponent(<Modal isOpen fallbackUrl="" />);

    const fav = await screen.findByRole('button', {
      name: /Add to favourites/i,
    });

    userEvent.click(fav);

    await waitFor(() => expect(fav).toHaveTextContent('Remove from favourites'));
  });
});
