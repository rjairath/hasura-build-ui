import { gql } from "graphql-tag";
// having this query here will allow codegen to generate a function to fetch it
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
gql`
  query GetDataForDatapad {
    allPeople(first: 100) {
      people {
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
    }
    allPlanets(first: 100) {
      planets {
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
    }
    allStarships(first: 100) {
      starships {
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
    }
  }
`;
