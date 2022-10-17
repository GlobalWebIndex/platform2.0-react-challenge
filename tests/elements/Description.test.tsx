import { render } from '@testing-library/react';
import { Description } from 'components/elements/Description';
import '@testing-library/jest-dom';

describe('Description', () => {
    it('Renders correctly', () => {
        const data = {
            alt_names: "Other Names", 
            description: "Description", 
            life_span: "Life Span", 
            temperament: "Temperament"
        };

        const { container } = render(<Description {...data} />);
        expect(container).toMatchSnapshot();
    })
});