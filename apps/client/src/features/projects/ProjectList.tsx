import { IProject } from '@gensymtech-projects/api-interfaces';
import { FC, useMemo } from 'react';
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
      {projects.map((project) => (
        <ProjectCard project={project} draggable={draggable} />
      ))}
    </Stack>
  );
};

export default ProjectList;
