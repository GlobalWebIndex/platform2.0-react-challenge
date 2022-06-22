import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Constants from 'common/constants';
import MobileMenu from './MobileMenu';

describe('MobileMenu component', () => {
  it("will render 'Cats'", () => {
    render(<MobileMenu links={Constants.ROUTES} />, { wrapper: MemoryRouter });

    const element = screen.getByText('Cats');

    expect(element).toBeTruthy();
  });
});
