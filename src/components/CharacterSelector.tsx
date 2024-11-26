import type { ComboboxItem } from "@mantine/core";
import type { Person } from "../codegen/swapi-types";
import { Box, Select } from "@mantine/core";
import { useState } from "react";

export const CharacterSelector = ({ characters }: { characters: Person[] }) => {
	const [selectedCharacter, setSelectedCharacter] =
		useState<ComboboxItem | null>(null);

	const selectCharacterData = characters?.map((c) => {
		return {
			value: c.id,
			label: c.name || "unknown",
		};
	});

	return (
		<Box>
			<Select
				label="Select a Character"
				data={selectCharacterData}
				value={selectedCharacter ? selectedCharacter.value : null}
				onChange={(_value, option) => setSelectedCharacter(option)}
			/>
			<Box>Selected Character:</Box>

			<CharacterData
				person={characters.find((c) => c.id === selectedCharacter?.value)}
			/>
		</Box>
	);
};

const CharacterData = ({ person }: { person: Person | undefined }) => {
	return (
		<>
			{!person ? (
				<Box>No character Selected</Box>
			) : (
				<>
					<Box>{person.homeworld?.name}</Box>

					<Box>{person.species ? person.species.name : "Unknown Species"}</Box>

					<Box>
						{person.filmConnection?.films
							? person.filmConnection.films
									.map((f) => (f ? f.title : "unknown film"))
									.join(", ")
							: "No known film connections"}
					</Box>
				</>
			)}
		</>
	);
};
