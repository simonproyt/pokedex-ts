import { describe, expect, test, vi } from "vitest";
import { commandInspect } from "./command_inspect.js";
import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

describe("commandInspect", () => {
  test("prints details for a caught pokemon", async () => {
    const pokemon: Pokemon = {
      id: 16,
      name: "pidgey",
      base_experience: 50,
      height: 3,
      weight: 18,
      stats: [
        { base_stat: 40, stat: { name: "hp", url: "" } },
        { base_stat: 45, stat: { name: "attack", url: "" } },
        { base_stat: 40, stat: { name: "defense", url: "" } },
        { base_stat: 35, stat: { name: "special-attack", url: "" } },
        { base_stat: 35, stat: { name: "special-defense", url: "" } },
        { base_stat: 56, stat: { name: "speed", url: "" } },
      ],
      types: [
        { slot: 1, type: { name: "normal", url: "" } },
        { slot: 2, type: { name: "flying", url: "" } },
      ],
    };

    const state: State = {
      rl: {} as any,
      commands: {},
      pokeapi: {} as any,
      pokedex: { pidgey: pokemon },
      nextLocationsURL: undefined,
      prevLocationsURL: undefined,
    };

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandInspect(state, "pidgey");

    expect(logSpy).toHaveBeenCalledWith("Name: pidgey");
    expect(logSpy).toHaveBeenCalledWith("Height: 3");
    expect(logSpy).toHaveBeenCalledWith("Weight: 18");
    expect(logSpy).toHaveBeenCalledWith("Stats:");
    expect(logSpy).toHaveBeenCalledWith("  -hp: 40");
    expect(logSpy).toHaveBeenCalledWith("  -attack: 45");
    expect(logSpy).toHaveBeenCalledWith("  -defense: 40");
    expect(logSpy).toHaveBeenCalledWith("  -special-attack: 35");
    expect(logSpy).toHaveBeenCalledWith("  -special-defense: 35");
    expect(logSpy).toHaveBeenCalledWith("  -speed: 56");
    expect(logSpy).toHaveBeenCalledWith("Types:");
    expect(logSpy).toHaveBeenCalledWith("  - normal");
    expect(logSpy).toHaveBeenCalledWith("  - flying");

    logSpy.mockRestore();
  });

  test("prints not caught message when pokemon is missing", async () => {
    const state: State = {
      rl: {} as any,
      commands: {},
      pokeapi: {} as any,
      pokedex: {},
      nextLocationsURL: undefined,
      prevLocationsURL: undefined,
    };

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await commandInspect(state, "pidgey");

    expect(logSpy).toHaveBeenCalledWith("you have not caught that pokemon");

    logSpy.mockRestore();
  });
});
