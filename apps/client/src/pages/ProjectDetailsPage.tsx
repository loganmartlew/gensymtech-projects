import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconEdit } from '@tabler/icons';
import { Group, Stack, Title, Button } from '@mantine/core';
import { useProject } from '../features/projects/api/getProject';

const ProjectDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useProject(id || '0');

  if (isLoading) return <Title order={4}>Loading...</Title>;
  if (!project) return <Title order={2}>Project Not Found</Title>;

  return (
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
    </Stack>
  );
};

export default ProjectDetailsPage;
