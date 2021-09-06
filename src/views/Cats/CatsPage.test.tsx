import { render } from '@testing-library/react';
import React from 'react';
import { CatsPage } from './CatsPage';

test('renders cats page', () => {
  render(<CatsPage />);
});
