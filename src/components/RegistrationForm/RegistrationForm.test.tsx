import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RegistrationForm from "./RegistrationForm";
import { MemoryRouter as Router } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("RegistrationForm", () => {
  it("renders registration form correctly", () => {
    render(
      <Router>
        <RegistrationForm />
      </Router>
    );
    expect(screen.getByRole("heading", { name: "Sign up" })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(document.querySelector(".date-picker")).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeInTheDocument();

    expect(screen.getAllByLabelText(/Country/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/City/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Street/)).toHaveLength(2);
    expect(screen.getAllByLabelText(/Postal Code/)).toHaveLength(2);
  });
});
