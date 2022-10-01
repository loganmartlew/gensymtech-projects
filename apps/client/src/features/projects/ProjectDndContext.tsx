import { FC, ReactNode } from 'react';
import { UseMutateFunction } from 'react-query';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IProject, ProjectMoveDTO } from '@gensymtech-projects/api-interfaces';
import { ProjectStatus } from '@gensymtech-projects/types';

interface Props {
  children: ReactNode;
  move: UseMutateFunction<
    IProject[],
    unknown,
    ProjectMoveDTO[],
    {
      previousProjects: unknown;
    }
  >;
  projects: IProject[];
}

const ProjectDndContext: FC<Props> = ({ children, move, projects }) => {
  const onDragEnd = (result: DropResult) => {
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

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default ProjectDndContext;
