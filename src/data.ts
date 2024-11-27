import { gql } from "graphql-tag";
import { SwapiClient } from "./client";
import { Character, Planet, Starship } from "./types";

// Fragment for People
const PEOPLE_FIELDS = gql`
  fragment PeopleFields on Person {
    id
    name
    species {
      id
      name
    }
    homeworld {
      id
      name
      climates
      population
      terrains
    }
    starshipConnection {
      starships {
        id
        name
        model
        manufacturers
        hyperdriveRating
      }
    }
    filmConnection {
      films {
        id
        title
        releaseDate
      }
    }
  }
`;

// Fragment for Planets
const PLANET_FIELDS = gql`
  fragment PlanetFields on Planet {
    id
    name
    population
    climates
    terrains
    residentConnection {
      residents {
        id
        name
        species {
          id
          name
        }
      }
    }
  }
`;

// Fragment for Starships
const STARSHIP_FIELDS = gql`
  fragment StarshipFields on Starship {
    id
    name
    model
    manufacturers
    hyperdriveRating
    pilotConnection {
      pilots {
        id
        name
      }
    }
  }
`;

// Main query using fragments
const GET_DATA_FOR_DATAPAD = gql`
  query GetDataForDatapad {
    allPeople(first: 100) {
      people {
        ...PeopleFields
      }
    }
    allPlanets(first: 100) {
      planets {
        ...PlanetFields
      }
    }
    allStarships(first: 100) {
      starships {
        ...StarshipFields
      }
    }
  }
  ${PEOPLE_FIELDS}
  ${PLANET_FIELDS}
  ${STARSHIP_FIELDS}
`;

function notNull<T = unknown>(x: T) {
  return x !== null && x !== undefined;
}

type ReturnData = {
  people: Character[];
  starships: Starship[];
  planets: Planet[];
};

export async function fetchDataForDatapad(): Promise<ReturnData> {
  const data = await SwapiClient.GetDataForDatapad();

  return {
    people: data.allPeople?.people?.filter(notNull) ?? [],
    starships: data.allStarships?.starships?.filter(notNull) ?? [],
    planets: data.allPlanets?.planets?.filter(notNull) ?? [],
  };
}

export { GET_DATA_FOR_DATAPAD };
