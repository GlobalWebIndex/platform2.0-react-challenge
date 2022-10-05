import { render, screen } from '../../utils/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Breeds from './Breeds.component';
import { mockedBreeds } from '../../mocks/api/breeds';
import { TestIds } from '../../utils/testids';

const server = setupServer(
    rest.get('*/breeds', (req, res, ctx) => {
        return res(ctx.json(mockedBreeds));
    })
);

beforeAll(() =>
    server.listen({
        onUnhandledRequest: 'warn',
    })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('shows skeleton fetches and displays breeds', async () => {
    render(<Breeds />);
    const skeleton = await screen.findByTestId('skeleton-container');
    expect(skeleton).toBeInTheDocument();
    const breeds = await screen.findAllByTestId(TestIds.breedItem);
    expect(breeds.length).toEqual(mockedBreeds.length);
});
