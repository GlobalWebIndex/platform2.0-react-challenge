import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "../NotFound";

describe("<NotFound/>", () => {
  it("renders", () => {
    const { container } = render(<NotFound />, { wrapper: BrowserRouter });
    expect(container).toMatchSnapshot();
  });
});
