import { render, screen, waitFor } from "@testing-library/react";
import FavouritesView from "../FavouritesView";
import * as api from "../../../util/api.js";
import { BrowserRouter } from "react-router-dom";

describe("FavouritesView", () => {
  it("renders", async () => {
    jest.spyOn(api, "fetchFavourites").mockResolvedValue([
      {
        image: {
          id: "12",
          url: "https://cat.com",
        },
      },
    ]);

    const { container } = render(<FavouritesView />, {
      wrapper: BrowserRouter,
    });

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      screen.getByTestId("card-image");
    });

    expect(container).toMatchSnapshot();
  });

  it("renders an empty list", async () => {
    jest.spyOn(api, "fetchFavourites").mockResolvedValue([]);

    render(<FavouritesView />, {
      wrapper: BrowserRouter,
    });

    await waitFor(() => {
      expect(screen.getByTestId("empty-favourite-list")).toBeInTheDocument();
    });
  });
});
