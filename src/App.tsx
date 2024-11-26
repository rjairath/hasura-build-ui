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
      const data = await SwapiClient.GetDataForDatapad();
      console.log(data);
      return data;
    },
  });

  return (
    <div>
      {isLoading && <p>Loading SWAPI Data...</p>}
      {isError && <p>Error fetching SWAPI Data</p>}
      {dataPadData && (
        <div>
          <h1>Datapad Data Loaded!</h1>
          <p>Check the console to see your data</p>
        </div>
      )}
    </div>
  );
}

export default App;
