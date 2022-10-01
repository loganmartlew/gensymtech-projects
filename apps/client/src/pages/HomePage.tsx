import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Group, Stack, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import StatusColumnCard from '../features/projects/StatusColumnCard';
import ProjectList from '../features/projects/ProjectList';
import { useAllProjects } from '../features/projects/api/getAllProjects';

const HomePage: FC = () => {
  const { data: projects, isLoading } = useAllProjects();

  return (
    <Stack>
      <Group>
        <Title order={2}>Projects</Title>
        <Button
          component={Link}
          to="/new-project"
          size="xs"
          leftIcon={<IconPlus size={16} />}
        >
          New Project
        </Button>
      </Group>

      <Group grow align="flex-start">
        <StatusColumnCard title="Planned">
          <ProjectList
            projects={projects?.filter(
              (project) => project.status === ProjectStatus.PLANNED
            )}
            isLoading={isLoading}
            draggable
          />
        </StatusColumnCard>

        <StatusColumnCard title="In Progress">
          <ProjectList
            projects={projects?.filter(
              (project) => project.status === ProjectStatus.IN_PROGRESS
            )}
            isLoading={isLoading}
            draggable
          />
        </StatusColumnCard>

        <StatusColumnCard title="Completed">
          <ProjectList
            projects={projects?.filter(
              (project) => project.status === ProjectStatus.COMPLETED
            )}
            isLoading={isLoading}
            draggable
          />
        </StatusColumnCard>
      </Group>
    </Stack>
  );
};

export default HomePage;
