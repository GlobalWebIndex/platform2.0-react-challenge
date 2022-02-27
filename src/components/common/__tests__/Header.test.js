import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("<Header/>", () => {
  it("renders", () => {
    const { container } = render(<Header title="A title" />);

    expect(container).toMatchSnapshot();
  });

  it("does not render without title", () => {
    render(<Header />);

    expect(screen.queryByTestId("header")).not.toBeInTheDocument();
  });
});
