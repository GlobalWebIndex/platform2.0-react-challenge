import { render, screen } from '@testing-library/react';
import { dummyIndex } from 'configuration/dummy';
import Index from 'pages/index';
import '@testing-library/jest-dom';

describe('Index Page', () => {
    it("renders correctly", () => {
        const { container } = render(
            <Index data={dummyIndex} />
        );

        expect(container).toMatchSnapshot();
    });

    it('Home Page shows nothing found when no data are returned', () => {
        render(
            <Index data={[]} />
        );

        expect(screen.getByTestId("no-cats")).toBeInTheDocument();
    });
});