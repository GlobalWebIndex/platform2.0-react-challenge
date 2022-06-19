import { render, screen } from "@testing-library/react";

import Home from "./Home";

describe("Home screen", () => {
  it("will render 'I am Home'", () => {
    render(<Home />);

    const element = screen.getByText("I am Home");

    expect(element).toBeTruthy();
  });
});
