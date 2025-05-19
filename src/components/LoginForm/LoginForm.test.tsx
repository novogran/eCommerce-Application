import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter as Router } from "react-router";
import "@testing-library/jest-dom/vitest";

describe("LoginForm", () => {
  it("renders login form correctly", () => {
    render(
      <Router>
        <LoginForm
          email={""}
          password={""}
          isEmailValid={false}
          isPasswordValid={false}
          onEmailChange={function (): void {
            throw new Error("Function not implemented.");
          }}
          onPasswordChange={function (): void {
            throw new Error("Function not implemented.");
          }}
          onSubmit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Router>
    );

    expect(screen.getByRole("heading", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Show password" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Don't have an account/ })).toBeInTheDocument();
  });
});
