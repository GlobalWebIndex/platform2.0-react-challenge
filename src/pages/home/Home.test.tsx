import { render, screen } from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Home from './Home.component';
import { mockedCats } from '../../mocks/api/cats';

const server = setupServer(
    rest.get('*/images/search', (req, res, ctx) => {
        return res(ctx.json(mockedCats));
    })
);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'warn',
    })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('shows skeleton fetches and displays cats', async () => {
    render(<Home />);
    const skeleton = await screen.findByTestId('skeleton-container');
    expect(skeleton).toBeInTheDocument();
    const cats = await screen.findAllByTestId('cat');
    expect(cats.length).toEqual(mockedCats.length);
});
