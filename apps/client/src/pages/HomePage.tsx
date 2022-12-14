import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Droppable } from 'react-beautiful-dnd';
import { Group, Stack, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import StatusColumnCard from '../features/projects/StatusColumnCard';
import ProjectList from '../features/projects/ProjectList';
import { useAllProjects } from '../features/projects/api/getAllProjects';
import { useMoveProjects } from '../features/projects/api/moveProjects';
import ProjectDndContext from '../features/projects/ProjectDndContext';

const HomePage: FC = () => {
  const { data: unsortedProjects, isLoading } = useAllProjects();
  const move = useMoveProjects();

  const projects = unsortedProjects?.sort((a, b) => a.order - b.order) ?? [];

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

      <ProjectDndContext move={move} projects={projects}>
        <Group grow align="flex-start">
          <StatusColumnCard title="Planned">
            <Droppable droppableId={ProjectStatus.PLANNED}>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  <ProjectList
                    projects={projects?.filter(
                      (project) => project.status === ProjectStatus.PLANNED
                    )}
                    isLoading={isLoading}
                    draggable
                  />
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </StatusColumnCard>

          <StatusColumnCard title="In Progress">
            <Droppable droppableId={ProjectStatus.IN_PROGRESS}>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  <ProjectList
                    projects={projects?.filter(
                      (project) => project.status === ProjectStatus.IN_PROGRESS
                    )}
                    isLoading={isLoading}
                    draggable
                  />
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </StatusColumnCard>

          <StatusColumnCard title="Completed">
            <Droppable droppableId={ProjectStatus.COMPLETED}>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  <ProjectList
                    projects={projects?.filter(
                      (project) => project.status === ProjectStatus.COMPLETED
                    )}
                    isLoading={isLoading}
                    draggable
                  />
                </ul>
              )}
            </Droppable>
          </StatusColumnCard>
        </Group>
      </ProjectDndContext>
    </Stack>
  );
};

export default HomePage;
