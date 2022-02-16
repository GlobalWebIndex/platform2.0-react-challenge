import { render } from "@testing-library/react";
import FavouriteCats from "./FavouriteCats";

const renderFavouriteCatsPage = () => {
  return render(<FavouriteCats />);
};

describe("App <FavouriteCats /> component", () => {
  it("should render favouriteCats correctly", () => {
    const { getByTestId } = renderFavouriteCatsPage();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("favourites-section")).toBeInTheDocument();
  });
});
