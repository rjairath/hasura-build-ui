import React, { useState } from 'react';
import { Autocomplete, Stack, Paper } from "@mantine/core";
import { Character } from "../types";
import SelectedCharacterCard from './SelectedCharacterCard';

type characterSelectorProps = {
  characters: Character[];
}

export const CharacterSelector: React.FC<characterSelectorProps> = ({characters}) => {
  const [selectedStr, setSelectedStr] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

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
