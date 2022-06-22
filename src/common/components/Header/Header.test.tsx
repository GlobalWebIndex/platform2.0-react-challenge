import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header component', () => {
  it("will render 'CatLover' inside header", () => {
    render(<Header />);

    const element = screen.getByText('CatLover');

    expect(element).toBeTruthy();
  });
});
