import {
  Alert,
  Center,
  Container,
  LoadingOverlay,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { CharacterSelector } from "./components/CharacterSelector";
import { MissionSummary } from "./components/MissionSummary";
import { PlanetSelector } from "./components/PlanetSelector";
import { StarshipSelector } from "./components/StarshipSelector";
import { fetchDataForDatapad } from "./data";

function App() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["data-pad-data"],
    queryFn: () => fetchDataForDatapad(),
  });

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
        <Paper withBorder p={"xl"} component={Stack} gap={"xl"}>
          <Title order={1}>Galactic Datapad</Title>
          <Stack>
            {/* Feature components: */}
            <CharacterSelector characters={data.people} />
            <PlanetSelector planets={data.planets} />
            <StarshipSelector starships={data.starships} />
            <MissionSummary starship={null} planet={null} character={null} />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default App;
