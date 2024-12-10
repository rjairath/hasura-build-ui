import React from "react";
import { Planet } from "../types";
import {
    Badge,
    Card,
    Center,
    Divider,
    Group,
    List,
    Stack,
    Text,
} from "@mantine/core";

type SelectedPlanetCardProps = {
    planet: Planet | null;
};


const SelectedPlanetCard: React.FC<SelectedPlanetCardProps> = ({ planet }) => {

    if (!planet) {
        return (
            <Card shadow="sm" padding="md" withBorder radius={"md"}>
                <Center>
                    <Text>Select a Planet above</Text>
                </Center>
            </Card>
        );
    }
    
    const renderSpeciesList = (residents: any[] | null | undefined) => {
        const speciesSet: {[key: string]: any} = {};
        residents?.forEach((item, index) => {
            if(item.species?.name) {
                let speciesName = (item.species.name).toLowerCase();
                // setSpeciesSet(prev => {return {...prev, [speciesName.toLowerCase()]: true}})
                speciesSet[speciesName] = (speciesSet[speciesName] || 0) + 1
            } else {
                // setSpeciesSet(prev => {return {...prev, "human": true}})
                speciesSet["human"] = (speciesSet["human"] || 0) + 1
            }
        });

        return (
            <Group>
                {Object.keys(speciesSet)?.map((speciesName, index) => (
                    <Badge
                        variant="gradient"
                        gradient={{ from: "blue", to: "cyan", deg: 90 }}
                        key={index}
                    >
                        {speciesName}
                    </Badge>
                ))}
            </Group>
        );
    }

    return (
        <Card shadow="sm" padding="md" withBorder radius={"md"}>
            {/* Name os planet */}
            <Text fw={700} size="xl">
                {planet.name}
            </Text>
            
            {/* population, climate, and terrain */}
            <Group
                mt="sm"
                justify="space-between"
                align="center"
                wrap="wrap"
                style={{ width: "100%" }}
            >
                <Group>
                    <Text size="sm" fw={500}>
                        Climate:
                    </Text>
                    {planet.climates?.map(
                        (climate, index) => (
                            <Badge key={index}>{climate}</Badge>
                        ),
                    )}
                </Group>

                <Group>
                    <Text size="sm" fw={500}>
                        Population:
                    </Text>
                    <Text size="md" fw={500}>
                        {planet.population ?? 0}
                    </Text>   
                </Group>

                <Group>
                    <Text size="sm" fw={500}>
                        Terrain:
                    </Text>
                    {planet.terrains?.map(
                        (terrain, index) => (
                            <Badge key={index}>{terrain}</Badge>
                        ),
                    )}  
                </Group>
            </Group>

            {
                planet.residentConnection?.residents && planet.residentConnection?.residents?.length > 0 && (
                    <>
                    <Stack gap="xs">
                        <Group mt="sm" justify="space-between" align="center" style={{width: "100%"}}>
                            <Text fw={500} size="lg">Residents:</Text>
                            <Divider style={{ flex: 1 }}/>
                        </Group>

                        {renderSpeciesList(planet.residentConnection?.residents)}
                    </Stack>
                    
                    </>
                )
            }
        </Card>
    );
};

export default SelectedPlanetCard;
