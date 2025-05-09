import { expect, test } from "vitest";
import { validateInput } from "./validation";

test("input validation", () => {
  expect(validateInput({ type: "email", value: "name@.com" })).toBe(false);
  expect(validateInput({ type: "email", value: " name@.com" })).toBe(false);
  expect(validateInput({ type: "email", value: "name@domain.com " })).toBe(false);
  expect(validateInput({ type: "email", value: "name" })).toBe(false);
  expect(validateInput({ type: "email", value: "namedomain.com" })).toBe(false);
  expect(validateInput({ type: "email", value: "name@domain.com" })).toBe(true);
  expect(validateInput({ type: "password", value: "Passw0rd" })).toBe(true);
  expect(validateInput({ type: "password", value: "Password" })).toBe(false);
  expect(validateInput({ type: "password", value: "passw0rd" })).toBe(false);
  expect(validateInput({ type: "password", value: " Passw0rd" })).toBe(false);
  expect(validateInput({ type: "password", value: "Passw0rd " })).toBe(false);
  expect(validateInput({ type: "firstName", value: "Smit" })).toBe(true);
  expect(validateInput({ type: "lastName", value: "Colins" })).toBe(true);
  expect(validateInput({ type: "city", value: "Vilnus" })).toBe(true);
  expect(validateInput({ type: "firstName", value: "" })).toBe(false);
  expect(validateInput({ type: "firstName", value: "Smit1" })).toBe(false);
  expect(validateInput({ type: "firstName", value: "Smit!" })).toBe(false);
  expect(validateInput({ type: "lastName", value: "" })).toBe(false);
  expect(validateInput({ type: "lastName", value: "Colins1" })).toBe(false);
  expect(validateInput({ type: "lastName", value: "Colins!" })).toBe(false);
  expect(validateInput({ type: "city", value: "" })).toBe(false);
  expect(validateInput({ type: "city", value: "Vilnus1" })).toBe(false);
  expect(validateInput({ type: "city", value: "Vilnus!" })).toBe(false);
});
