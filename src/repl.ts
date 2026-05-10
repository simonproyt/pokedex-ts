import type { State } from "./state.js";
import type { Interface } from "node:readline";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function startREPL(state: State) {
  const rl: Interface = state.rl;

  rl.prompt();

  rl.on("line", async (line: string) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state, ...words.slice(1));
      } catch (error) {
        console.log("Error:", error instanceof Error ? error.message : error);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
