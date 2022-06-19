import { render, screen } from '@testing-library/react';

import Card from './Card';

describe('Card component', () => {
  it('will render a card', () => {
    render(<Card url="a_url" />);

    const element = screen.getAllByAltText('a cat');

    expect(element).toBeTruthy();
  });
});
