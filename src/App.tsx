import { useQuery } from "@tanstack/react-query";
import { SwapiClient } from "./client";
import { Stack, Text, Title } from "@mantine/core";

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
    <Stack>
      {isLoading && <p>Loading SWAPI Data...</p>}
      {isError && <p>Error fetching SWAPI Data</p>}
      {dataPadData && (
        <Stack>
          <Title>Datapad Data Loaded!</Title>
          <Text>Check the console to see your data</Text>
        </Stack>
      )}
    </Stack>
  );
}

export default App;
