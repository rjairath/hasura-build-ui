import React, { useState } from 'react';
import { Autocomplete, Stack, Paper } from "@mantine/core";
import { Character } from "../types";
import SelectedCharacterCard from './SelectedCharacterCard';

type characterSelectorProps = {
  characters: Character[];
  selectedCharacter: Character | null;
  setSelectedCharacter: React.Dispatch<React.SetStateAction<Character | null>>
}

export const CharacterSelector: React.FC<characterSelectorProps> = ({characters, selectedCharacter, setSelectedCharacter}) => {
  const [selectedStr, setSelectedStr] = useState("");

  return (
    <Stack style={{ flex: 1, maxWidth: "33.33%" }}>
      <Autocomplete
        label="Pick a Character"
        radius={"md"}
        placeholder="Pick a value or start typing..."
        value={selectedStr}
        onChange={(val) => setSelectedStr(val)}
        data={characters.filter(item => item !== null && item !== undefined).map((item) => item.name!)}
        onOptionSubmit={(item) => {
          const selectedItem = characters.find((d) => d.name === item);
          setSelectedCharacter(selectedItem || null);
        }}
      />

    <SelectedCharacterCard 
      character={selectedCharacter}
    />
    </Stack>
  );
};
