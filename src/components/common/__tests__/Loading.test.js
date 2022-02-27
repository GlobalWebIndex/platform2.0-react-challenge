import { render } from "@testing-library/react";
import Loading from "../Loading";

describe("<Loading/>", () => {
  it("renders", () => {
    const { container } = render(<Loading />);
    expect(container).toMatchSnapshot();
  });
});
