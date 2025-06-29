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
  expect(validateInput({ type: "dob", value: "2010-05-15" })).toBe(true);
  expect(validateInput({ type: "dob", value: "2020-01-01" })).toBe(false);
  expect(validateInput({ type: "street", value: "Levshina" })).toBe(true);
  expect(validateInput({ type: "street", value: "" })).toBe(false);
  expect(validateInput({ type: "postalCode", value: { code: "225351", country: "BY" } })).toBe(
    true
  );
  expect(validateInput({ type: "postalCode", value: { code: "22535", country: "BY" } })).toBe(
    false
  );
  expect(validateInput({ type: "country", value: "BY" })).toBe(true);
  expect(validateInput({ type: "country", value: "US" })).toBe(false);
});
