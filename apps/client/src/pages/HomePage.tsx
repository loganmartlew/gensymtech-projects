import { IProject } from '@gensymtech-projects/api-interfaces';
import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Group, Stack, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import StatusColumnCard from '../features/projects/StatusColumnCard';
import ProjectList from '../features/projects/ProjectList';

const projects: IProject[] = [
  {
    id: '1',
    name: 'Furnace Array',
    description: 'Furnace Array',
    status: ProjectStatus.COMPLETED,
    dependencies: [],
    order: -1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const HomePage: FC = () => {
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
            projects={projects.filter(
              (project) => project.status === ProjectStatus.PLANNED
            )}
            isLoading={false}
          />
        </StatusColumnCard>

        <StatusColumnCard title="In Progress">
          <ProjectList
            projects={projects.filter(
              (project) => project.status === ProjectStatus.IN_PROGRESS
            )}
            isLoading={false}
          />
        </StatusColumnCard>

        <StatusColumnCard title="Completed">
          <ProjectList
            projects={projects.filter(
              (project) => project.status === ProjectStatus.COMPLETED
            )}
            isLoading={false}
          />
        </StatusColumnCard>
      </Group>
    </Stack>
  );
};

export default HomePage;
