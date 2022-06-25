import { render, screen, fireEvent } from '@testing-library/react';

import ImageCard from './ImageCard';

describe('ImageCard component', () => {
  let mockedCat = {
    id: '123',
    url: 'a_url',
    breeds: [],
  };

  it('will render a card', () => {
    render(<ImageCard cat={mockedCat} onSelect={() => {}} />);

    const element = screen.getAllByAltText('a cat');

    expect(element).toBeTruthy();
  });

  it('will call the onSelect prop on card click', () => {
    const onSelect = jest.fn();

    render(<ImageCard cat={mockedCat} onSelect={onSelect} />);

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
