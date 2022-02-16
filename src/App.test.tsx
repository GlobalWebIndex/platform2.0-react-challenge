import { render } from "@testing-library/react";
import App from "./App";

const renderAppPage = () => {
  return render(<App />);
};

describe("App <App /> component", () => {
  it("should render app correctly", () => {
    const { getByTestId } = renderAppPage();
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByTestId("app-section")).toBeInTheDocument();
  });
});
