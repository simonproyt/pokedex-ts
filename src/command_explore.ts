import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  const locationName = args.join(" ").trim();
  if (!locationName) {
    console.log("Please provide a location area to explore.");
    return;
  }

  console.log(`Exploring ${locationName}...`);
  const location = await state.pokeapi.fetchLocation(locationName);

  const pokemonNames = location.pokemon_encounters.map((encounter) => encounter.pokemon.name);

  console.log("Found Pokemon:");
  for (const name of pokemonNames) {
    console.log(` - ${name}`);
  }
}
