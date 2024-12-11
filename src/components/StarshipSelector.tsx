import React, { useState } from "react";
import { Autocomplete, Stack } from "@mantine/core";
import { Starship } from "../types";
import { useEffect } from "react";


type StarshipSelectorProps = {
    pilotedStarships: any[] | undefined | null;
    allStarships: Starship[] | undefined;
    selectedShip: Starship | null;
    setSelectedShip: React.Dispatch<React.SetStateAction<Starship | null>>;
    isMobile?: boolean;
};

const StarshipSelector: React.FC<StarshipSelectorProps> = ({ pilotedStarships, allStarships, selectedShip, setSelectedShip, isMobile }) => {
  // Filter out pilotedShips from allStarShips
  const [rebelStarships, setRebelStarships] = useState<Starship[] | undefined | null>(null);
  const [selectedPiloted, setSelectedPiloted] = useState<string | null>(null);
  const [selectedRebel, setSelectedRebel] = useState<string | null>(null);

  useEffect(() => {
    const temp = allStarships?.filter(ship => !isExistsInPiloted(ship.id));
    setRebelStarships(temp);
  }, [pilotedStarships]);

    
  const isExistsInPiloted = (shipId: string) => {
    return pilotedStarships?.find(ship => ship.id === shipId);
  }

  // Handle piloted starship selection
  const handlePilotedChange = (value: string) => {
    setSelectedPiloted(value || null);
    const temp = allStarships?.find((d) => d.name === value);
    setSelectedShip(temp!);
    if (value) {
      setSelectedRebel(null); // Clear Rebel selection if a piloted starship is chosen
    }
  };

  // Handle Rebel starship selection
  const handleRebelChange = (value: string) => {
    setSelectedRebel(value || null);
    const temp = allStarships?.find((d) => d.name === value);
    setSelectedShip(temp!);
    if (value) {
      setSelectedPiloted(null); // Clear Piloted selection if a Rebel starship is chosen
    }
  };

  return (
    <Stack style={{ flex: 1, width: isMobile ? "100%" : "33%" }}>
        {/* Piloted Starships Section */}
        <Autocomplete
          label="Pick a piloted starship"
          placeholder="Pick a value or start typing..."
          radius={"md"}
          data={pilotedStarships?.map((ship) => ship.name)}
          value={selectedPiloted || ""}
          onChange={handlePilotedChange}
          disabled={!pilotedStarships}
        />

        {/* Rebel Alliance Starships Section */}
        <Autocomplete
          label="Pick a rebel starship"
          placeholder="Pick a value or start typing..."
          radius={"md"}
          data={rebelStarships?.map((ship) => ship.name)}
          value={selectedRebel || ""}
          onChange={handleRebelChange}
        />
    </Stack>
  );
};

export default React.memo(StarshipSelector);
