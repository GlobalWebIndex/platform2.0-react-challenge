import { render } from '@testing-library/react';
import React from 'react';
import { FavoritesPage } from './FavoritesPage';

test('renders favorites page', () => {
  render(<FavoritesPage />);
});
