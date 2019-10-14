/* eslint-disable no-undef */
import { updateCatsFavouriteId } from './helpers';

const mockCats = [
  {
    breeds: [],
    id: '5p0',
    url: 'https://cdn2.thecatapi.com/images/5p0.jpg',
    width: 320,
    height: 350,
  },
  {
    breeds: [],
    id: '2ju',
    url: 'https://cdn2.thecatapi.com/images/2ju.jpg',
    width: 500,
    height: 333,
  },
];

const mockFavourites = [
  {
    id: 2008148,
    image: {
      id: '5p0',
      url: 'https://cdn2.thecatapi.com/images/5p0.jpg',
    },
  },
];

const expecteUpdatedCats = [
  {
    breeds: [],
    id: '5p0',
    url: 'https://cdn2.thecatapi.com/images/5p0.jpg',
    width: 320,
    height: 350,
    favouriteId: 2008148,
  },
  {
    breeds: [],
    id: '2ju',
    url: 'https://cdn2.thecatapi.com/images/2ju.jpg',
    width: 500,
    height: 333,
    favouriteId: undefined,
  },
];

it('updates cats favouriteId props based on user favourites', () => {
  const updatedCats = updateCatsFavouriteId(mockCats, mockFavourites);
  expect(updatedCats).toEqual(expecteUpdatedCats);
});
