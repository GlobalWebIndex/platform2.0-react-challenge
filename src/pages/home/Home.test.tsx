import { render, screen, waitForElementToBeRemoved } from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home.component';
import { mockedFavorites } from '../../mocks/api/favorites';
import { mockedCats } from '../../mocks/api/cats';

const server = setupServer(
    rest.get('*/images/search', (req, res, ctx) => {
        res(ctx.json(mockedCats));
    })
    // rest.get('*/favorites', (req, res, ctx) => {
    //     res(ctx.json(mockedFavorites));
    // })
);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'warn',
    })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetching cats', async () => {
    render(<Home />);
    await waitForElementToBeRemoved(() => screen.queryByTestId('skeleton-container'), { timeout: 5000 });
    expect(screen.findByTestId(mockedCats[0].id)).toBeInTheDocument();
});
