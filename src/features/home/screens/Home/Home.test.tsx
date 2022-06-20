import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Home } from './Home';

describe('Home screen', () => {
  const catsRequested = jest.fn();

  it("will render 'I am Home'", () => {
    render(
      <Home catsRequested={catsRequested} data={{ data: [], status: '' }} />,
      { wrapper: MemoryRouter }
    );

    const element = screen.getByText('I am Home');

    expect(element).toBeTruthy();
  });

  it('will call catsRequested', () => {
    render(
      <Home catsRequested={catsRequested} data={{ data: [], status: '' }} />,
      { wrapper: MemoryRouter }
    );

    expect(catsRequested).toBeCalledWith({
      limit: 10,
      page: 0,
    });
  });
});
