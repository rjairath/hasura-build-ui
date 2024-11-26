import { Box, Container, Loader, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { SwapiClient } from "./client";

function App() {
  const {
    data: dataPadData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data-pad-data"],
    queryFn: async () => {
      // data here is typed based on the SWAPI schema, so you should be able to glean the structure from the data
      const data = await SwapiClient.GetDataForDatapad();
      console.log(data);
      return data;
    },
  });

  return (
    <Container fluid>
      {(() => {
        if (isLoading) {
          return <Loader />;
        }

        if (isError) {
          return <Text>Error Fetching Datapad Data</Text>;
        }

        return (
          <Stack>
            <Box className="star-wars">
              <Stack className="crawl">
                <Title size={"xl"} fz={"500%"} order={1}>
                  Hasura Interview Data!
                </Title>
                {JSON.stringify(dataPadData, null, 2)}
              </Stack>
            </Box>
          </Stack>
        );
      })()}
    </Container>
  );
}

export default App;
