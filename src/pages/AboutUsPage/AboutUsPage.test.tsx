// AboutUsPage.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutUsPage from "./AboutUsPage";
import { MemoryRouter as Router } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("AboutUsPage", () => {
  it("renders main content correctly", () => {
    render(
      <Router>
        <AboutUsPage />
      </Router>
    );

    expect(screen.getByText("DreamTeam - About Us")).toBeInTheDocument();
    expect(screen.getByText(/Our friendly team acted cohesively/)).toBeInTheDocument();
    const creatorNames = ["Semenenko Vladislav", "Novogran Vitaly", "Vasilev Aleksandr"];
    creatorNames.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    const rssLink = screen.getByRole("link", { name: /RSSchool/ });
    expect(rssLink).toHaveAttribute("href", "https://rs.school/");
    expect(rssLink).toHaveAttribute("target", "_blank");
    const logo = screen.getByAltText("RSSchool Logo");
    expect(logo).toHaveAttribute("src", "/rss-logo.svg");
  });
});
