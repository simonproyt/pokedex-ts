import readline from "node:readline";
import type { CLICommand } from "./command.js";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
  return input
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
}

export function startREPL() {
  const commands = getCommands();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (line: string) => {
    const words = cleanInput(line);
    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(commands);
      } catch (error) {
        console.log("Error:", error instanceof Error ? error.message : error);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
