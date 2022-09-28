import CardContents from "../CardContents";
import { render, screen } from "@testing-library/react";

describe("<CardContents/>", () => {
  it("renders", () => {
    const { container } = render(
      <CardContents
        imageSrc="https://cat.image"
        imageHeight={311}
        imageWidth={111}
        id="abc"
        title="lovely cat"
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("renders a child component", () => {
    render(
      <CardContents title="lovely cats">
        <div data-testid="temp-component" />
      </CardContents>
    );

    expect(screen.getByTestId("temp-component")).toBeInTheDocument();
  });

  it("renders without title", () => {
    render(
      <CardContents
        imageSrc="https://cat.image"
        imageHeight={311}
        imageWidth={111}
        id="abc"
      />
    );

    expect(screen.queryByTestId("card-title")).not.toBeInTheDocument();
  });

  it("renders without an image", () => {
    render(<CardContents title="lovely cats" />);

    expect(screen.queryByTestId("card-image")).not.toBeInTheDocument();
  });
});
