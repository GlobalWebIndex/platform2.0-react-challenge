import { render } from "@testing-library/react";
import Card from "../Card";
import { BrowserRouter } from "react-router-dom";

const propsData = {
  imageSrc: "https://cat.com",
  imageWidth: 311,
  imageHeight: 111,
  id: "abc",
  title: "lovely cat",
};

describe("<Card/>", () => {
  it("renders a card with dedicated link", () => {
    const { container } = render(
      <Card cardLink="cat/abc" isInGrid {...propsData} />,
      { wrapper: BrowserRouter }
    );

    expect(container).toMatchSnapshot();
  });

  it("renders a card without dedicated link", () => {
    const { container } = render(<Card {...propsData} />, {
      wrapper: BrowserRouter,
    });

    expect(container).toMatchSnapshot();
  });
});
