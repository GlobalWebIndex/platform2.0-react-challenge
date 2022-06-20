import { render, screen } from '@testing-library/react';

import { Breeds } from './Breeds';

describe('Favorites screen', () => {
  const breedsRequested = jest.fn();
  const clearNotificationMessage = jest.fn();

  it("will render 'I am Breeds'", () => {
    render(
      <Breeds
        breedsRequested={breedsRequested}
        clearNotificationMessage={clearNotificationMessage}
        notification={{ error: '', success: '' }}
        data={{ data: [], status: '' }}
      />
    );

    const element = screen.getByText('I am Breeds');

    expect(element).toBeTruthy();
  });

  it('will call breedsRequested', () => {
    render(
      <Breeds
        breedsRequested={breedsRequested}
        clearNotificationMessage={clearNotificationMessage}
        notification={{ error: '', success: '' }}
        data={{ data: [], status: '' }}
      />
    );

    expect(breedsRequested).toBeCalledWith({
      limit: 10,
      page: 0,
    });
  });
});
