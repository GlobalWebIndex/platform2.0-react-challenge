import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Home } from './Home';

describe('Home screen', () => {
  const catsRequested = jest.fn();

  it("will render 'I am Home'", () => {
    render(
      <Home
        data={{
          data: [],
          status: '',
          details: { data: [], status: '' },
          favorite: { status: '' },
        }}
        loading={false}
        catsRequested={catsRequested}
      />,
      { wrapper: MemoryRouter }
    );

    const element = screen.getByText('I am Home');

    expect(element).toBeTruthy();
  });

  it('will call catsRequested', () => {
    render(
      <Home
        data={{
          data: [],
          status: '',
          details: { data: [], status: '' },
          favorite: { status: '' },
        }}
        loading={false}
        catsRequested={catsRequested}
      />,
      { wrapper: MemoryRouter }
    );

    expect(catsRequested).toBeCalledWith({
      limit: 10,
      page: 0,
    });
  });
});
