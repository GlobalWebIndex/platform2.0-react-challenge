import { screen, render } from '../../../../utils/test-utils';
import Stats from './Stats.component';

test('should render no info breeds missing', () => {
    render(
        <Stats
            selectedCat={{
                height: 232,
                id: '2q1',
                url: 'https://cdn2.thecatapi.com/images/2q1.gif',
                width: 320,
            }}
        />
    );
    const heading = screen.getByText('Info not available for this beauty!');
    expect(heading).toBeInTheDocument;
});

test('should render cats info', () => {
    render(
        <Stats
            selectedCat={{
                height: 232,
                id: '2q1',
                url: 'https://cdn2.thecatapi.com/images/2q1.gif',
                width: 320,
                breeds: [
                    {
                        id: 'asdf',
                        name: 'American Bobtail',
                        description:
                            'American Bobtails are loving and incredibly intelligent cats possess',
                        dog_friendly: 5,
                        energy_level: 3,
                        intelligence: 5,
                        adaptability: 3,
                        health_issues: 4,
                        social_needs: 4,
                    },
                ],
            }}
        />
    );
    expect(screen.getByText('Dog friendly')).toBeInTheDocument;
    expect(screen.getByText('Energy level')).toBeInTheDocument;
    expect(screen.getByText('Intelligence')).toBeInTheDocument;
    expect(screen.getByText('Adaptability')).toBeInTheDocument;
    expect(screen.getByText('Health issues')).toBeInTheDocument;
    expect(screen.getByText('Social needs')).toBeInTheDocument;
});
