import { FC } from 'react';
import { Group } from '@mantine/core';
import StatusColumnCard from '../features/projects/StatusColumnCard';
import ProjectList from '../features/projects/ProjectList';
import { IProject } from '@gensymtech-projects/api-interfaces';
import { ProjectStatus } from '@gensymtech-projects/types';

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
  );
};

export default HomePage;
