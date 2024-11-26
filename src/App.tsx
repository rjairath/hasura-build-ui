import { Box, Container, Loader, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { SwapiClient } from "./client";
import { CharacterSelector, MissionSummary } from "./components";

import type { Person, Planet } from "./codegen/swapi-types";

function App() {
	const {
		data: dataPadData,
		isPending,
		isError,
	} = useQuery({
		queryKey: ["data-pad-data"],
		queryFn: async () => {
			// data here is typed based on the SWAPI schema, so you should be able to glean the structure from the data
			const data = await SwapiClient.GetDataForDatapad();
			return data;
		},
	});

	if (isPending) {
		return <Loader />;
	}

	if (isError) {
		return <Text>Error Fetching Datapad Data</Text>;
	}

	const characters = (dataPadData.allPeople?.people || []) as Person[];
	const planets = (dataPadData.allPlanets?.planets || []) as Planet[];

	return (
		<Container fluid>
			<Stack>
				<Box className="">
					<Stack className="">
						<Title size={"xl"} fz={"500%"} order={1}>
							Galactic Datapad
						</Title>

						<Box>
							<CharacterSelector characters={characters} />
						</Box>

						<Box>
							<MissionSummary planets={planets} />
						</Box>
					</Stack>
				</Box>
			</Stack>
		</Container>
	);
}

export default App;
