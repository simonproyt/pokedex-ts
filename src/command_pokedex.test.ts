import { describe, expect, test, vi } from "vitest";
import { commandPokedex } from "./command_pokedex.js";
import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

describe("commandPokedex", () => {
  test("prints all caught pokemon names", async () => {
    const state: State = {
      rl: {} as any,
      commands: {},
      pokeapi: {} as any,
      pokedex: {
        pidgey: { id: 16, name: "pidgey", base_experience: 50, height: 3, weight: 18, stats: [], types: [] },
        caterpie: { id: 10, name: "caterpie", base_experience: 39, height: 3, weight: 29, stats: [], types: [] },
      },
      nextLocationsURL: undefined,
      prevLocationsURL: undefined,
    };
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandPokedex(state);

    expect(logSpy).toHaveBeenCalledWith("Your Pokedex:");
    expect(logSpy).toHaveBeenCalledWith(" - pidgey");
    expect(logSpy).toHaveBeenCalledWith(" - caterpie");

    logSpy.mockRestore();
  });
});
