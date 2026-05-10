import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";

describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "",
    expected: [],
  },
  {
    input: "   ",
    expected: [],
  },
  {
    input: "One\tTwo\nThree",
    expected: ["one", "two", "three"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: ${JSON.stringify(expected)}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
