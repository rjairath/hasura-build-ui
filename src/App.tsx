import {
  Alert,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CharacterSelector } from "./components/CharacterSelector";
import { MissionSummary } from "./components/MissionSummary";
import { PlanetSelector } from "./components/PlanetSelector";
import StarshipSelector from "./components/StarshipSelector";
import { fetchDataForDatapad } from "./data";
import { useState } from "react";
import { Character } from "./types";

function App() {
  // When promise resolves, isPending = false, data = resolved value
  const { data, isPending, isError } = useQuery({
    queryKey: ["data-pad-data"],
    queryFn: () => fetchDataForDatapad(),
  });
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

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
      <Stack>
        <Paper withBorder p={"xl"} component={Stack} gap={"xl"} radius={"md"}>
          <Title order={1}>Galactic Datapad</Title>
          <Group justify="space-between" align="flex-start" style={{ width: "100%", gap: "1rem" }}>
            {/* Feature components: */}
            <CharacterSelector 
              characters={data.people} selectedCharacter={selectedCharacter} 
              setSelectedCharacter={setSelectedCharacter}
            />
            <PlanetSelector planets={data.planets} />
            <StarshipSelector 
              pilotedStarships={selectedCharacter?.starshipConnection?.starships}
              allStarships={data.starships}
            />
          </Group>
        </Paper>
        <Paper withBorder p={"xl"} radius={"md"}>
          <MissionSummary starship={null} planet={null} character={selectedCharacter} />
        </Paper>
      </Stack>
    </Container>
  );
}

export default App;
