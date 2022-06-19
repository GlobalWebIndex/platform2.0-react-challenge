import { render, screen } from '@testing-library/react';

import Breeds from './Breeds';

describe('Favorites screen', () => {
  it("will render 'I am Breeds'", () => {
    render(<Breeds />);

    const element = screen.getByText('I am Breeds');

    expect(element).toBeTruthy();
  });
});
