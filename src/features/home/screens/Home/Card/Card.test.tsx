import { render, screen, fireEvent } from '@testing-library/react';

import Card from './Card';

describe('Card component', () => {
  let mockedCat = {
    id: '123',
    url: 'a_url',
    breeds: [],
  };

  it('will render a card', () => {
    render(<Card cat={mockedCat} onSelect={() => {}} />);

    const element = screen.getAllByAltText('a cat');

    expect(element).toBeTruthy();
  });

  it('will call the onSelect prop on card click', () => {
    const onSelect = jest.fn();

    render(<Card cat={mockedCat} onSelect={onSelect} />);

    fireEvent(
      screen.getByAltText('a cat'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(onSelect).toBeCalledWith(mockedCat);
  });
});
