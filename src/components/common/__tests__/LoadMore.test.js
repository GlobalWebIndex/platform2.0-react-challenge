import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoadMore from "../LoadMore";

describe("<LoadMore/>", () => {
  it("renders", () => {
    const { container } = render(<LoadMore />);

    expect(container).toMatchSnapshot();
  });

  it("renders while loading", () => {
    const { container } = render(<LoadMore isLoadingMore />);

    expect(container).toMatchSnapshot();
  });

  it("loads more data", () => {
    const onClick = jest.fn();

    render(<LoadMore onClick={onClick} />);

    userEvent.click(screen.getByTestId("load-more"));

    expect(onClick).toHaveBeenCalled();
  });
});
