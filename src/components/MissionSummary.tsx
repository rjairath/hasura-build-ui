import { Box } from "@mantine/core";
import { Character, Planet, Starship } from "../types";

export const MissionSummary = (props: {
  planet: Planet | null;
  character: Character | null;
  starship: Starship | null;
}) => {
  return <Box>Mission Summary</Box>;
};
