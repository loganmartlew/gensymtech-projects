import { IProject } from '@gensymtech-projects/api-interfaces';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import DeleteDialog from '../../components/DeleteDialog';
import { useDeleteProject } from './api/deleteProject';

interface Props {
  project: IProject;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { mutate } = useDeleteProject(() => {
    navigate('/');
  });

  const confirm = () => {
    mutate(project.id);
  };

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

            <ActionIcon
              color="red"
              variant="filled"
              onClick={() => setDialogOpen(true)}
            >
              <IconTrash size={16} />
            </ActionIcon>
            <DeleteDialog
              open={dialogOpen}
              handleClose={() => setDialogOpen(false)}
              onConfirm={confirm}
              entity="project"
            />
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default ProjectCard;
