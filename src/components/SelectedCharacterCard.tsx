import React from 'react';
import { Character } from "../types";
import { Badge, Card, Center, Divider, Group, List, Stack, Text } from '@mantine/core';

type SelectedCharacterCardProps = {
    character: Character | null;
}

const SelectedCharacterCard: React.FC<SelectedCharacterCardProps> = ({ character }) => {
    if(!character) {
        return (
            <Card shadow="sm" padding="md" withBorder radius={"md"}>
                <Center>
                    <Text>Select a Character above</Text>
                </Center>
            </Card>
        )
    }
  return (
    <Card shadow="sm" padding="md" withBorder radius={"md"}>
      {/* Name and Species */}
      <Group justify="space-between">
        <Text fw={700} size="xl">
          {character.name}
        </Text>
        <Badge
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >{character.species ? character.species.name : "Human"}</Badge>
      </Group>

      {/* Homeworld section is conditional */}
      {character.homeworld && (
        <>
          <Stack gap="xs">
            {/* <Text fw={500} size="lg">
              Homeworld:
            </Text> */}
            <Group mt="sm" justify="space-between" align="center" style={{width: "100%"}}>
                <Text fw={500} size="lg">Homeworld:</Text>
                <Divider style={{ flex: 1 }}/>
            </Group>
            <Text fw={400} size='md'>{character.homeworld.name}</Text>

            {character.homeworld?.climates?.length! > 0 && (
              <Group>
                <Text size="sm" fw={500}>
                  Climates:
                </Text>
                {character.homeworld.climates?.map((climate, index) => (
                  <Badge key={index}>{climate}</Badge>
                ))}
              </Group>
            )}
          </Stack>
          
        </>
      )}

      {/* Movies */}
      <Stack gap="xs">
        <Group mt="sm" justify="space-between" align="center" style={{width: "100%"}}>
            <Text fw={500} size="lg">Appears in Movies:</Text>
            <Divider style={{ flex: 1 }}/>
        </Group>
        <List withPadding size="sm">
          {character?.filmConnection?.films?.map((film, index) => (
            <List.Item key={film?.id}>{film?.title}</List.Item>
          ))}
        </List>
      </Stack>
    </Card>
  );
}

export default SelectedCharacterCard