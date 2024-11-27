import {
  PeopleFieldsFragment,
  StarshipFieldsFragment,
  PlanetFieldsFragment,
} from "./codegen/swapi-types";

export type Character = PeopleFieldsFragment;
export type Starship = StarshipFieldsFragment;
export type Planet = PlanetFieldsFragment;
