import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Group, Stack, Title, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import StatusColumnCard from '../features/projects/StatusColumnCard';
import ProjectList from '../features/projects/ProjectList';
import { useAllProjects } from '../features/projects/api/getAllProjects';
import { useMoveProjects } from '../features/projects/api/moveProjects';

const HomePage: FC = () => {
  const { data: unsortedProjects, isLoading } = useAllProjects();
  const move = useMoveProjects();

  const projects = unsortedProjects?.sort((a, b) => a.order - b.order) ?? [];

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const project = projects?.find((p) => p.id === result.draggableId);
    if (!project) return;

    if (result.destination?.index == null) return;

    if (result.destination?.droppableId === result.source.droppableId) {
      if (result.destination?.index === result.source.index) return;
    }

    const destinationColumn = result.destination.droppableId;
    const destinationIndex = result.destination.index;

    const newProjects = projects.map((project) => {
      if (project.id !== result.draggableId) return project;

      return {
        ...project,
        status: destinationColumn as ProjectStatus,
      };
    });

    const newProject = newProjects.find((p) => p.id === result.draggableId);
    if (!newProject) return;

    const otherProjects = newProjects.filter(
      (p) => p.id !== result.draggableId
    );

    const columns = {
      [ProjectStatus.PLANNED]: otherProjects.filter(
        (p) => p.status === ProjectStatus.PLANNED
      ),
      [ProjectStatus.IN_PROGRESS]: otherProjects.filter(
        (p) => p.status === ProjectStatus.IN_PROGRESS
      ),
      [ProjectStatus.COMPLETED]: otherProjects.filter(
        (p) => p.status === ProjectStatus.COMPLETED
      ),
    };

    const newOrderedProjects = Object.entries(columns).flatMap(
      ([status, projects]) => {
        if (status !== destinationColumn)
          return projects.map((p, i) => ({
            ...p,
            order: i,
          }));

        return [
          ...projects.slice(0, destinationIndex),
          { ...newProject, order: destinationIndex },
          ...projects.slice(destinationIndex),
        ].map((p, i) => ({
          ...p,
          order: i,
        }));
      }
    );

    const dtos = newOrderedProjects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status,
      order: p.order,
      dependencies: p.dependencies.map((d) => d.id),
    }));

    move(dtos);
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
