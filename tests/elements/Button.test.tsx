import { render, screen } from '@testing-library/react';
import { Button } from 'components/elements/Button';
import '@testing-library/jest-dom';

const link = {
    label: "Press me",
    href: "/"
};

describe('Button', () => {
    it('Button is disabled when we pass the prop', () => {
        render(
            <Button {...{ link }} disabled />
        );

        expect(screen.getByTestId("button")).toHaveAttribute("disabled");
    });

    it("renders correctly", () => {
        const { container } = render(
            <Button {...{ link }} disabled />
        );
        expect(container).toMatchSnapshot();
    });
});