import React, { useState } from "react";
import { Autocomplete, Stack } from "@mantine/core";
import { Planet } from "../types";
import SelectedPlanetCard from "./SelectedPlanetCard";

type PlanetSelectorProps = {
  planets?: Planet[];
  selectedPlanet: Planet | null;
  setSelectedPlanet: React.Dispatch<React.SetStateAction<Planet | null>>;
  isMobile?: boolean;
}

const PlanetSelector: React.FC<PlanetSelectorProps> = ({planets, selectedPlanet, setSelectedPlanet, isMobile}) => {
  const [selectedStr, setSelectedStr] = useState("");

  return (
    <Stack style={{ flex: 1, width: isMobile ? "100%" : "33%" }}>
      <Autocomplete
        label="Pick a Planet"
        radius={"md"}
        placeholder="Pick a value or start typing..."
        value={selectedStr}
        onChange={(val) => setSelectedStr(val)}
        data={planets?.filter(item => item !== null && item !== undefined).map((item) => item.name!)}
        onOptionSubmit={(item) => {
          const selectedItem = planets?.find((d) => d.name === item);
          setSelectedPlanet(selectedItem || null);
        }}
      />

    <SelectedPlanetCard
      planet={selectedPlanet}
    />
    </Stack>
  );
};

export default React.memo(PlanetSelector);
