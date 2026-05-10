import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  const pokemonName = args.join(" ").trim();
  if (!pokemonName) {
    console.log("Please provide a Pokemon to catch.");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);
  const baseExperience = pokemon.base_experience;
  const catchChance = Math.max(0.1, 1 - baseExperience / 300);
  const caught = Math.random() < catchChance;

  if (caught) {
    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} was caught!`);
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
