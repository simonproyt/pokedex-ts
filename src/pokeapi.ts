import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    this.cache = new Cache(60_000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;
    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location areas: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as ShallowLocations;
    this.cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.cache.get<Location>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location ${locationName}: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as Location;
    this.cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      return cached;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon ${pokemonName}: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as Pokemon;
    this.cache.add(url, data);
    return data;
  }
}

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type LanguageName = {
  name: string;
  language: NamedAPIResource;
};

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
};

export type LocationEncounter = {
  pokemon: NamedAPIResource;
  version_details: unknown[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: unknown[];
  location: NamedAPIResource;
  names: LanguageName[];
  pokemon_encounters: LocationEncounter[];
  region: NamedAPIResource | null;
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: NamedAPIResource }[];
  types: { slot: number; type: NamedAPIResource }[];
};
