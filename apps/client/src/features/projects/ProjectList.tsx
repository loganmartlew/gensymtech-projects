import { IProject } from '@gensymtech-projects/api-interfaces';
import { FC, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Text, Stack } from '@mantine/core';
import ProjectCard from './ProjectCard';

interface Props {
  projects: IProject[] | undefined;
  isLoading: boolean;
  draggable?: boolean;
}

const ProjectList: FC<Props> = ({ projects, isLoading, draggable }) => {
  const noProjects = useMemo(() => <Text>No Projects.</Text>, []);
  const loading = useMemo(() => <Text>Loading...</Text>, []);

  if (isLoading) return loading;
  if (!projects || !projects.length) return noProjects;

  return (
    <Stack>
      {draggable &&
        projects.map((project, index) => (
          <Draggable key={project.id} draggableId={project.id} index={index}>
            {(provided) => (
              <li ref={provided.innerRef} {...provided.draggableProps}>
                <ProjectCard
                  project={project}
                  draggable={draggable}
                  handleProps={provided.dragHandleProps}
                />
              </li>
            )}
          </Draggable>
        ))}
      {!draggable &&
        projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
    </Stack>
  );
};

export default ProjectList;
