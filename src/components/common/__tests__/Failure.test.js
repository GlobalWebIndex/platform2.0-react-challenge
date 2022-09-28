import { render } from "@testing-library/react";
import Failure from "../Failure";

describe("<Failure/>", () => {
  it("renders", () => {
    const { container } = render(<Failure />);
    expect(container).toMatchSnapshot();
  });
});
