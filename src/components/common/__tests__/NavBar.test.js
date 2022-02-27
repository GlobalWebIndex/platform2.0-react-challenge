import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../NavBar";

describe("<NavBar/>", () => {
  it("renders", () => {
    const { container } = render(<NavBar />, { wrapper: BrowserRouter });

    expect(container).toMatchSnapshot();
  });
});
