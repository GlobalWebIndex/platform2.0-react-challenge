import { rest } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import { mockBreedsPage1, mockBreedsPage2, mockFavourites } from './responses';

export const handlers = [
  rest.get('https://api.thecatapi.com/v1/images/search',
    (req, res, ctx) => {
      const images = [];

      for (let step = 0; step < 10; step += 1) {
        images.push({
          breeds: [],
          id: uuidv4(),
          url: 'https://cdn2.thecatapi.com/images/55l.jpg',
          width: 640,
          height: 427,
        });
      }

      return res(
        ctx.status(200),
        ctx.json(images),
      );
    }),
  rest.get('https://api.thecatapi.com/v1/breeds',
    (req, res, ctx) => {
      const page = req.url.searchParams.get('page');
      if (page === '0') {
        return res(
          ctx.status(200),
          ctx.set('pagination-count', '67'),
          ctx.json(mockBreedsPage1),
        );
      }
      return res(
        ctx.status(200),
        ctx.set('pagination-count', '67'),
        ctx.json(mockBreedsPage2),
      );
    }),
  rest.get('https://api.thecatapi.com/v1/favourites',
    (req, res, ctx) => res(
      ctx.status(200),
      ctx.json(mockFavourites),
    )),
  rest.post('https://api.thecatapi.com/v1/favourites',
    (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        message: 'SUCCESS',
        id: 2101982,
      }),
    )),
  rest.get('https://api.thecatapi.com/v1/images/:imageId',
    (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        id: '7CGV6WVXq',
        url: 'https://cdn2.thecatapi.com/images/7CGV6WVXq.jpg',
        breeds: [],
      }),
    )),
  rest.delete('https://api.thecatapi.com/v1/favourites/:favouriteId',
    (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({
        message: 'SUCCESS',
      }),
    )),
  rest.get('/fake-url-to-test-useFindItem-hook',
    (req, res, ctx) => res(
      ctx.status(200),
      ctx.json({ data: 'Fetched Item' }),
    )),
];
