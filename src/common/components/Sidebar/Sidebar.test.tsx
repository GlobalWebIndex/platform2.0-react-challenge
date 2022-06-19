import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

describe('Sidebar component', () => {
  it("will render 'Home'", () => {
    render(<Sidebar />, { wrapper: MemoryRouter });

    const element = screen.getByText('Home');

    expect(element).toBeTruthy();
  });
});
