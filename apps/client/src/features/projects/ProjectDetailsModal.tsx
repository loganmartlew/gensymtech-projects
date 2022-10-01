import { IProject } from '@gensymtech-projects/api-interfaces';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconEdit } from '@tabler/icons';
import { Modal, Group, Stack, Title, Button, Text } from '@mantine/core';
import StatusBadge from '../../components/StatusBadge';
import ProjectList from './ProjectList';

interface Props {
  open: boolean;
  handleClose: () => void;
  project: IProject;
}

const ProjectDetailsModal: FC<Props> = ({ project, open, handleClose }) => {
  return (
    <Modal opened={open} onClose={handleClose} withCloseButton={false}>
      <Stack>
        <Group>
          <Title order={2}>{project.name}</Title>
          <Button
            component={Link}
            to="/new-project"
            size="xs"
            variant="outline"
            leftIcon={<IconEdit size={16} />}
          >
            Edit Project
          </Button>
        </Group>

        <Group spacing="xs">
          <Title order={5}>Status:</Title>
          <StatusBadge status={project.status} />
        </Group>

        <Stack spacing="xs">
          <Title order={5}>Description:</Title>
          <Text>{project.description}</Text>
        </Stack>

        <Stack spacing="xs">
          <Title order={5}>Dependencies:</Title>
          {project.dependencies.length > 0 ? (
            <ProjectList projects={project.dependencies} isLoading={false} />
          ) : (
            <Text>No dependencies</Text>
          )}
        </Stack>

        <Button onClick={handleClose} variant="light">
          Close
        </Button>
      </Stack>
    </Modal>
  );
};

export default ProjectDetailsModal;
