import type { ComboboxItem } from "@mantine/core";
import type { Planet } from "../codegen/swapi-types";
import { Box, Select } from "@mantine/core";
import { useState } from "react";

export const MissionSummary = ({ planets }: { planets: Planet[] }) => {
	const [selectedPlanet, setSelectedPlanet] = useState<ComboboxItem | null>(
		null,
	);

	const planetData = planets.map((p) => {
		return {
			value: p.id,
			label: p.name || "Unknown planet",
		};
	});

	return (
		<Box>
			<Select
				label="Select a Planet Mission"
				data={planetData}
				value={selectedPlanet ? selectedPlanet.value : null}
				onChange={(_value, option) => setSelectedPlanet(option)}
			/>

			<PlanetData
				planet={planets.find((p) => p.id === selectedPlanet?.value)}
			/>
		</Box>
	);
};

const PlanetData = ({ planet }: { planet: Planet | undefined }) => {
	return (
		<>
			{!planet ? (
				<Box>No mission selected</Box>
			) : (
				<>
					<Box>{planet.name}</Box>

					<Box>
						{planet.population?.toLocaleString() || "Unknown population"}
					</Box>

					<Box>{planet.climates?.join(", ")}</Box>

					<Box>{planet.terrains?.join(", ")}</Box>
				</>
			)}
		</>
	);
};
