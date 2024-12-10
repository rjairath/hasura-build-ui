import { Box, Center, Text } from "@mantine/core";
import { Character, Planet, Starship } from "../types";

type MissionSummaryProps = {
  planet: Planet | null;
  character: Character | null;
  starship: Starship | null;
}

export const MissionSummary: React.FC<MissionSummaryProps> = ({
    planet,
    character,
    starship,
}) => {
    console.log(planet, character, starship, "checking")
    const renderStr = () => {
      if(!character || !planet || !starship) {
        return "Mission Summary"
      }
      return `Rebel Operative ${character?.name} is ready to depart to ${planet?.name} 
        aboard the ${starship?.name} Starfighter. May the Force be with you!`;
    };

    return (
        <Box>
            <Center>
              <Text>{renderStr()}</Text>
            </Center>
        </Box>
    );
};
