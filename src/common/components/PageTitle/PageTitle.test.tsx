import { render, screen } from '@testing-library/react';

import PageTitle from './PageTitle';

describe('PageTitle component', () => {
  it("will render 'A title'", () => {
    render(<PageTitle text="A title" />);

    const element = screen.getByText('A title');

    expect(element).toBeTruthy();
  });
});
