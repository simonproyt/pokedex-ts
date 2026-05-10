import { describe, expect, test, vi } from "vitest";
import { commandCatch } from "./command_catch.js";
import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

describe("commandCatch", () => {
  test("catches a pokemon when random succeeds", async () => {
    const pokemon: Pokemon = {
      id: 7,
      name: "squirtle",
      base_experience: 63,
      height: 5,
      weight: 90,
      stats: [
        { base_stat: 48, stat: { name: "hp", url: "" } },
        { base_stat: 65, stat: { name: "attack", url: "" } },
        { base_stat: 64, stat: { name: "defense", url: "" } },
        { base_stat: 50, stat: { name: "special-attack", url: "" } },
        { base_stat: 50, stat: { name: "special-defense", url: "" } },
        { base_stat: 43, stat: { name: "speed", url: "" } },
      ],
      types: [{ slot: 1, type: { name: "water", url: "" } }],
    };

    const state: State = {
      rl: {} as any,
      commands: {},
      pokeapi: { fetchPokemon: vi.fn(async () => pokemon) } as any,
      pokedex: {},
      nextLocationsURL: undefined,
      prevLocationsURL: undefined,
    };

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.01);

    await commandCatch(state, "squirtle");

    expect(logSpy).toHaveBeenCalledWith("Throwing a Pokeball at squirtle...");
    expect(logSpy).toHaveBeenCalledWith("squirtle was caught!");
    expect(state.pokedex.squirtle).toEqual(pokemon);

    logSpy.mockRestore();
    randomSpy.mockRestore();
  });

  test("misses a pokemon when random fails", async () => {
    const pokemon: Pokemon = {
      id: 25,
      name: "pikachu",
      base_experience: 112,
      height: 4,
      weight: 60,
      stats: [
        { base_stat: 35, stat: { name: "hp", url: "" } },
        { base_stat: 55, stat: { name: "attack", url: "" } },
        { base_stat: 40, stat: { name: "defense", url: "" } },
        { base_stat: 50, stat: { name: "special-attack", url: "" } },
        { base_stat: 50, stat: { name: "special-defense", url: "" } },
        { base_stat: 90, stat: { name: "speed", url: "" } },
      ],
      types: [{ slot: 1, type: { name: "electric", url: "" } }],
    };

    const state: State = {
      rl: {} as any,
      commands: {},
      pokeapi: { fetchPokemon: vi.fn(async () => pokemon) } as any,
      pokedex: {},
      nextLocationsURL: undefined,
      prevLocationsURL: undefined,
    };

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.99);

    await commandCatch(state, "pikachu");

    expect(logSpy).toHaveBeenCalledWith("Throwing a Pokeball at pikachu...");
    expect(logSpy).toHaveBeenCalledWith("pikachu escaped!");
    expect(state.pokedex.pikachu).toBeUndefined();

    logSpy.mockRestore();
    randomSpy.mockRestore();
  });
});
