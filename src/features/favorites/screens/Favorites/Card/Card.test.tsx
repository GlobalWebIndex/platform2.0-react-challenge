import { render, screen, fireEvent } from '@testing-library/react';

import Card from './Card';

describe('Favorites screen', () => {
  it("will render 'There are no favorite cats yet'", () => {
    const onDelete = jest.fn();

    render(
      <Card
        favorite={{
          id: '833',
          user_id: '4',
          image_id: '1ud',
          sub_id: '',
          created_at: '2018-10-24T08:35:48.000Z',
          image: {
            id: '1ud',
            url: 'https://cdn2.thecatapi.com/images/1ud.jpg',
          },
        }}
        onDelete={onDelete}
      />
    );

    fireEvent.click(screen.getByRole('button'));

    expect(onDelete).toBeCalledWith('833');
  });
});
