import { describe, expect, test, vi } from "vitest";
import type { Interface } from "node:readline";
import { getCommands } from "./command.js";
import { commandHelp } from "./command_help.js";
import type { State } from "./state.js";

describe("command registry", () => {
  test("registers help and exit commands", () => {
    const commands = getCommands();

    expect(commands.help).toBeDefined();
    expect(commands.exit).toBeDefined();
    expect(commands.help.description).toBe("Displays a help message");
    expect(commands.exit.description).toBe("Exit the Pokedex");
  });
});

describe("commandHelp", () => {
  test("prints help text for every registered command", () => {
    const commands = getCommands();
    const state: State = {
      rl: {} as Interface,
      commands,
    };
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    commandHelp(state);

    expect(logSpy).toHaveBeenCalledWith("Welcome to the Pokedex!");
    expect(logSpy).toHaveBeenCalledWith("Usage:");
    expect(logSpy).toHaveBeenCalledWith("help: Displays a help message");
    expect(logSpy).toHaveBeenCalledWith("exit: Exit the Pokedex");

    logSpy.mockRestore();
  });
});
