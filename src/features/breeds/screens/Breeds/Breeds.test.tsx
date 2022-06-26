import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Breeds } from './Breeds';

describe('Breeds screen', () => {
  const breedsRequested = jest.fn();

  it("will render 'List of 🐈🐈🐈🐈 breeds'", () => {
    render(
      <Breeds
        breedsRequested={breedsRequested}
        data={{ data: [], status: '', cats: [] }}
        loading={false}
      />,
      { wrapper: MemoryRouter }
    );

    const element = screen.getByText('List of 🐈🐈🐈🐈 breeds');

    expect(element).toBeTruthy();
  });

  it('will call breedsRequested', () => {
    render(
      <Breeds
        breedsRequested={breedsRequested}
        data={{ data: [], status: '', cats: [] }}
        loading={false}
      />,
      { wrapper: MemoryRouter }
    );

    expect(breedsRequested).toBeCalledWith({
      limit: 10,
      page: 0,
    });
  });
});
