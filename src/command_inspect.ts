import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  const pokemonName = args.join(" ").trim().toLowerCase();
  if (!pokemonName) {
    console.log("Please provide a Pokemon to inspect.");
    return;
  }

  const pokemon = state.pokedex[pokemonName];
  if (!pokemon) {
    console.log("you have not caught that pokemon");
    return;
  }

  console.log(`Name: ${pokemon.name}`);
  console.log(`Height: ${pokemon.height}`);
  console.log(`Weight: ${pokemon.weight}`);
  console.log("Stats:");
  for (const stat of pokemon.stats) {
    console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
  }

  console.log("Types:");
  for (const typeEntry of pokemon.types) {
    console.log(`  - ${typeEntry.type.name}`);
  }
}
