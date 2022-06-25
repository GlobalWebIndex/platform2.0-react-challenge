import { render, screen, fireEvent } from '@testing-library/react';
import MoreButton from './MoreButton';

describe('MoreButton component', () => {
  const onClick = jest.fn();

  it("will render 'Fetch cats'", () => {
    render(<MoreButton label="Fetch cats" loading={false} onClick={onClick} />);

    const element = screen.getByText('Fetch cats');

    expect(element).toBeTruthy();
  });

  it("will render 'Fetching...' if loading is true", () => {
    render(<MoreButton label="Fetch cats" loading={true} onClick={onClick} />);

    const element = screen.getByText('Fetching...');

    expect(element).toBeTruthy();
  });

  it('will trigger onClick', () => {
    render(<MoreButton label="Fetch cats" loading={false} onClick={onClick} />);

    fireEvent.click(screen.getByText('Fetch cats'));

    expect(onClick).toBeCalled();
  });
});
