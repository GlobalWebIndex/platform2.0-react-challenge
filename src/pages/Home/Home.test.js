import { render } from "@testing-library/react";
import Home from "./Home";

const renderHomePage = () => {
  return render(<Home />);
};

describe("App <Home /> component", () => {
  it("should render home correctly", () => {
    const { getByTestId } = renderHomePage();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("home-section")).toBeInTheDocument();
  });
});
