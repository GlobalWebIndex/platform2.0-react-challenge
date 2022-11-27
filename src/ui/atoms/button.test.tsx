import { StarIcon } from "@radix-ui/react-icons";
import { describe, it, expect } from "vitest";
import { render, screen, userEvent } from "../../utils/test";
import { Button, IconButton } from "./button";

describe("button", () => {
  it("should render", () => {
    render(<Button>test button</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should render loading indicator when isLoading is true", () => {
    render(<Button isLoading>test button</Button>);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should render disabled button when isLoading is true", () => {
    render(<Button isLoading>test button</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  it("should render iconRight", () => {
    render(
      <Button iconRight={<StarIcon data-testid="iconRight" />}>
        test button
      </Button>
    );
    expect(screen.getByTestId("iconRight")).toBeDefined();
  });

  it("should not render iconRight when loading", () => {
    render(
      <Button isLoading iconRight={<StarIcon data-testid="iconRight" />}>
        test button
      </Button>
    );
    expect(screen.queryByTestId("iconRight")).not.toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
