import { render, screen } from '@testing-library/react';

import { Home } from './Home';

describe('Home screen', () => {
  const catsRequested = jest.fn();
  const clearNotificationMessage = jest.fn();

  it("will render 'I am Home'", () => {
    render(
      <Home
        catsRequested={catsRequested}
        clearNotificationMessage={clearNotificationMessage}
        notification={{ error: '', success: '' }}
        data={{ data: [], status: '' }}
      />
    );

    const element = screen.getByText('I am Home');

    expect(element).toBeTruthy();
  });

  it('will call catsRequested', () => {
    render(
      <Home
        catsRequested={catsRequested}
        clearNotificationMessage={clearNotificationMessage}
        notification={{ error: '', success: '' }}
        data={{ data: [], status: '' }}
      />
    );

    expect(catsRequested).toBeCalledWith({
      limit: 10,
      page: 0,
    });
  });
});
