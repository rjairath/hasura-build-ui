import {
  Alert,
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Title,
  Notification,
  em
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { useQuery } from "@tanstack/react-query";
import CharacterSelector from "./components/CharacterSelector";
import { MissionSummary } from "./components/MissionSummary";
import PlanetSelector from "./components/PlanetSelector";
import StarshipSelector from "./components/StarshipSelector";
import { fetchDataForDatapad } from "./data";
import { useMemo, useState } from "react";
import { Character, Planet, Starship } from "./types";

function App() {
  // When promise resolves, isPending = false, data = resolved value
  const { data, isPending, isError } = useQuery({
    queryKey: ["data-pad-data"],
    queryFn: () => fetchDataForDatapad(),
  });
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedShip, setSelectedShip] = useState<Starship | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const pilotedStarships = useMemo(
      () => selectedCharacter?.starshipConnection?.starships || null,
      [selectedCharacter],
  );
  const allStarships = useMemo(() => data?.starships, [data]);
  const allCharacters = useMemo(() => data?.people, [data]);
  const allPlanets = useMemo(() => data?.planets, [data]);


  if (isPending) {
    return <LoadingOverlay visible />;
  }

  if (isError) {
    return (
      <Center m={"xl"}>
        <Alert color="red">⚠️ Error Fetching Datapad Data</Alert>
      </Center>
    );
  }

  return (
      <Container fluid maw={1200} my={"xl"}>
          <Stack style={{ position: "relative" }}>
              {showNotification && (
                  <Notification
                      style={{
                          position: "fixed",
                          right: "0",
                          top: "16px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: isMobile ? "80%" : "40%",
                          zIndex: "2",
                          border: "0.0625rem solid #424242"
                      }}
                      radius={"md"}
                      title="Mission Alert"
                      color="blue"
                      onClose={() => setShowNotification(false)}
                  >
                      May the force be with you!!
                  </Notification>
              )}
              <Paper
                  withBorder
                  p={"xl"}
                  component={Stack}
                  gap={"xl"}
                  radius={"md"}
              >
                  <Title order={1}>Galactic Datapad</Title>
                  <Group
                      justify="space-between"
                      align="flex-start"
                      style={{
                          width: "100%",
                          gap: "1rem",
                          flexDirection: isMobile ? "column" : "row",
                      }}
                  >
                      {/* Memoized */}
                      <CharacterSelector
                          characters={allCharacters}
                          selectedCharacter={selectedCharacter}
                          setSelectedCharacter={setSelectedCharacter}
                          isMobile={isMobile}
                      />
                      {/* Memoized */}
                      <PlanetSelector
                          planets={allPlanets}
                          selectedPlanet={selectedPlanet}
                          setSelectedPlanet={setSelectedPlanet}
                          isMobile={isMobile}
                      />
                      {/* Memoized */}
                      <StarshipSelector
                          pilotedStarships={pilotedStarships}
                          allStarships={allStarships}
                          selectedShip={selectedShip}
                          setSelectedShip={setSelectedShip}
                          isMobile={isMobile}
                      />
                  </Group>
                  <Button
                      style={{ marginLeft: "auto" }}
                      size="md"
                      variant="gradient"
                      gradient={{ from: "teal", to: "blue" }}
                      disabled={
                          !selectedCharacter || !selectedPlanet || !selectedShip
                      }
                      onClick={() => setShowNotification(true)}
                  >
                      Embark on Mission
                  </Button>
              </Paper>
              <Paper withBorder p={"xl"} radius={"md"}>
                  <MissionSummary
                      starship={selectedShip}
                      planet={selectedPlanet}
                      character={selectedCharacter}
                  />
              </Paper>
          </Stack>
      </Container>
  );
}

export default App;
