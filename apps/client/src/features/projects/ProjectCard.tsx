import { IProject } from '@gensymtech-projects/api-interfaces';
import { FC } from 'react';
import {
  Paper,
  Group,
  Stack,
  Title,
  Button,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
import { IconGripVertical, IconTrash } from '@tabler/icons';

interface Props {
  project: IProject;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const theme = useMantineTheme();

  return (
    <Paper
      sx={{
        padding: theme.spacing.xs,
        border: `thin solid ${theme.colors['gray'][2]}`,
        backgroundColor: theme.colors['gray'][1],
      }}
    >
      <Group align="flex-start" spacing={theme.spacing.xs}>
        <ActionIcon>
          <IconGripVertical size={16} />
        </ActionIcon>

        <Stack spacing={theme.spacing.xs}>
          <Title order={4}>{project.name}</Title>

          <Group spacing={theme.spacing.xs}>
            <Button variant="outline" size="xs" sx={{ width: 'max-content' }}>
              View Details
            </Button>

            <ActionIcon color="red" variant="filled">
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default ProjectCard;
