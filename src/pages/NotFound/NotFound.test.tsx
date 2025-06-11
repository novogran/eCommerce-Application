import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { MemoryRouter as Router } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("NotFoundPage", () => {
  it("renders not found page correctly", () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
    expect(screen.getByRole("heading", { name: /page not found/i, level: 1 })).toBeInTheDocument();
    const image = screen.getByRole("img", { name: /404 error/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/404.jpg");
  });
});
