import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Link from './Link';

describe('Link component', () => {
  it("will render 'Link'", () => {
    render(<Link to="/" label="a_label" />, { wrapper: MemoryRouter });

    const element = screen.getByText('a_label');

    expect(element).toBeTruthy();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it("will render href '/'", () => {
    render(<Link to="/" label="a_label" />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });
});
