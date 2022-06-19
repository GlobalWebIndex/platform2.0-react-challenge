import { render, screen } from '@testing-library/react';

import Home from './NotFound';

describe('Not Found screen', () => {
  it("will render 'Not found'", () => {
    render(<Home />);

    const element = screen.getByText('Not found');

    expect(element).toBeTruthy();
  });
});
