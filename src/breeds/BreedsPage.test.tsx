import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderComponent } from '../test-utils';
import { server } from '../mocks/server';
import { BreedsPage } from './BreedsPage';

describe('Breeds Page', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  test('renders successfully', async () => {
    renderComponent(<BreedsPage />);

    const previousButton = await screen.findByRole('button', { name: /Previous/i });

    expect(previousButton).toBeInTheDocument();
  });

  test('loads cat breeds initially', async () => {
    renderComponent(<BreedsPage />);

    const breeds = await screen.findAllByTestId('breed');

    expect(breeds).toHaveLength(10);

    const previousButton = screen.getByRole('button', { name: /Previous/i });

    expect(previousButton).toBeDisabled();

    expect(screen.getByText('Abyssinian')).toBeInTheDocument(); // This breed exists in page 1
  });

  test('loads cat breeds for next page', async () => {
    renderComponent(<BreedsPage />);

    const breeds = await screen.findAllByTestId('breed');

    expect(breeds).toHaveLength(10);

    expect(screen.getByText('Abyssinian')).toBeInTheDocument(); // This breed exists in page 1

    const nextButton = screen.getByRole('button', { name: /Next/i });

    userEvent.click(nextButton);

    await waitFor(() => screen.getByText('Bengal'));

    expect(breeds).toHaveLength(10);
  });
});
