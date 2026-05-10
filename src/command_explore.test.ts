import { describe, expect, test, vi } from "vitest";
import { commandExplore } from "./command_explore.js";
import type { State } from "./state.js";
import type { Location } from "./pokeapi.js";

describe("commandExplore", () => {
  test("prints pokemon names for the requested location area", async () => {
    const location: Location = {
      id: 1,
      name: "pastoria-city-area",
      game_index: 0,
      encounter_method_rates: [],
      location: { name: "pastoria-city", url: "" },
      names: [],
      pokemon_encounters: [
        { pokemon: { name: "tentacool", url: "" }, version_details: [] },
        { pokemon: { name: "magikarp", url: "" }, version_details: [] },
      ],
      region: null,
    };

    const state: State = {
      rl: {} as any,
      commands: {},
      pokeapi: { fetchLocation: vi.fn(async () => location) } as any,
      nextLocationsURL: undefined,
      prevLocationsURL: undefined,
    };

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandExplore(state, "pastoria-city-area");

    expect(logSpy).toHaveBeenCalledWith("Exploring pastoria-city-area...");
    expect(logSpy).toHaveBeenCalledWith("Found Pokemon:");
    expect(logSpy).toHaveBeenCalledWith(" - tentacool");
    expect(logSpy).toHaveBeenCalledWith(" - magikarp");

    logSpy.mockRestore();
  });
});
