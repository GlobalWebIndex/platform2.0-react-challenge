import { render, screen } from '@testing-library/react';

import { Home } from './Home';

describe('Home screen', () => {
  it("will render 'I am Home'", () => {
    const catsRequested = jest.fn();
    const clearNotificationMessage = jest.fn();

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
});
