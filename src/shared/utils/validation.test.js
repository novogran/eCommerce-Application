import { expect, test } from "vitest";
import { validateInput } from "./validation";

test("input validation", () => {
  expect(validateInput({ type: "email", value: "name@.com" })).toBe(false);
  expect(validateInput({ type: "email", value: "name@domain.com" })).toBe(true);
  expect(validateInput({ type: "password", value: "Passw0rd" })).toBe(true);
  expect(validateInput({ type: "password", value: "password" })).toBe(false);
});
