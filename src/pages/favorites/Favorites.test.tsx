import { setupServer } from 'msw/lib/node';
import { render, screen } from '../../utils/test-utils';
import { rest } from 'msw';
import Favorites from './Favorites.component';
import { mockedFavorites } from '../../mocks/api/favorites';
import { TestIds } from '../../utils/testids';

const server = setupServer(
    rest.get('*/favourites', (req, res, ctx) => {
        return res(ctx.json(mockedFavorites));
    })
);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'warn',
    })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('shows skeleton fetches and displays favorites', async () => {
    render(<Favorites />);
    const skeleton = await screen.findByTestId(TestIds.skeletonContainer);
    expect(skeleton).toBeInTheDocument();
    const favorites = await screen.findAllByTestId(TestIds.favoriteItem);
    expect(favorites.length).toEqual(mockedFavorites.length);
});

test('displays no favorites message when favorites length is 0', async () => {
    render(<Favorites />);
    server.use(
        rest.get('*/favourites', (req, res, ctx) => {
            return res(ctx.json([]));
        })
    );
    const skeleton = await screen.findByTestId(TestIds.skeletonContainer);
    expect(skeleton).toBeInTheDocument();
    const noFavoritesMessage = screen.getByText(/Looks like you do not have any favorites./i);
    expect(noFavoritesMessage).toBeInTheDocument();
});
