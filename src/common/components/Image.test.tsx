import React from 'react';
import { screen } from '@testing-library/react';
import { Image } from './Image';
import { renderComponent } from '../../test-utils';

test('Image fails to load gracefully', async () => {
  renderComponent(<Image src="" alt="Test" />);
  expect(screen.getByText('Could not load :(')).toBeInTheDocument();
});
