import React from "react";
import { render, screen } from "@testing-library/react";
import App from "pages";

test("renders the App Cats, Breed, Favorites selections", () => {
  render(<App />, {});

  expect(screen.getByText("Cats")).toBeDefined();
  expect(screen.getByText("Breeds")).toBeDefined();
  expect(screen.getByText("Favorites")).toBeDefined();
});
