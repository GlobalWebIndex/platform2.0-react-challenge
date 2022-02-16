import { render } from "@testing-library/react";
import Breeds from "./Breeds";

const renderBreedsPage = () => {
  return render(<Breeds />);
};

describe("App <Breeds /> component", () => {
  it("should render breeds correctly", () => {
    const { getByTestId } = renderBreedsPage();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("breeds-section")).toBeInTheDocument();
  });
});