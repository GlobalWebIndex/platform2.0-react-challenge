import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CardsWrapper from "../CardsWrapper";

describe("<CardWrapper/>", () => {
  it("renders", () => {
    const { container } = render(
      <CardsWrapper
        cardItems={[
          {
            id: "abc",
            imageSrc: "https://cat.com",
            imageHeight: 311,
            imageWidth: 111,
          },
        ]}
      />,
      { wrapper: BrowserRouter }
    );

    expect(container).toMatchSnapshot();
  });
});
