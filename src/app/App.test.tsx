import React from 'react';
import { screen } from '@testing-library/react';
import { App } from './App';
import { renderComponent } from '../test-utils';

test('renders app', () => {
  renderComponent(<App />);
  const linkElement = screen.getByText('CATS APP');
  expect(linkElement).toBeInTheDocument();
});
