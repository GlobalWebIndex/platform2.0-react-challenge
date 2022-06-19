import { render, screen } from '@testing-library/react';

import Favorites from './Favorites';

describe('Favorites screen', () => {
  it("will render 'I am Favorites'", () => {
    render(<Favorites />);

    const element = screen.getByText('I am Favorites');

    expect(element).toBeTruthy();
  });
});
