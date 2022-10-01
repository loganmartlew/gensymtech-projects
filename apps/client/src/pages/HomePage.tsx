import { ProjectDTO } from '@gensymtech-projects/api-interfaces';
import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Group, Stack, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import StatusColumnCard from '../features/projects/StatusColumnCard';
import ProjectList from '../features/projects/ProjectList';
import {
  allProjectsKey,
  useAllProjects,
} from '../features/projects/api/getAllProjects';
import { useUpdateProject } from '../features/projects/api/updateProject';

const HomePage: FC = () => {
  const queryClient = useQueryClient();

  const { data: projects, isLoading } = useAllProjects();
  const { mutate } = useUpdateProject(() => {
    queryClient.invalidateQueries([...allProjectsKey]);
  });

  const onDragEnd = (result: DropResult) => {
    const project = projects?.find((p) => p.id === result.draggableId);
    if (!project) return;

    if (result.destination?.droppableId !== project.status) {
      const projectDto: ProjectDTO = {
        ...project,
        dependencies: project.dependencies.map((d) => d.id),
        status: result.destination?.droppableId as ProjectStatus,
      };

      mutate({ id: project.id, dto: projectDto });
    }
  };

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

      <DragDropContext onDragEnd={onDragEnd}>
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
      </DragDropContext>
    </Stack>
  );
};

export default HomePage;
