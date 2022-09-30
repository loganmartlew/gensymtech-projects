import { IProject } from '@gensymtech-projects/api-interfaces';
import { FC, useMemo } from 'react';
import { Text, Stack } from '@mantine/core';
import ProjectCard from './ProjectCard';

interface Props {
  projects: IProject[];
  isLoading: boolean;
}

const ProjectList: FC<Props> = ({ projects, isLoading }) => {
  const noProjects = useMemo(() => <Text>No Projects.</Text>, []);
  const loading = useMemo(() => <Text>Loading...</Text>, []);

  if (!projects || !projects.length) return noProjects;
  if (isLoading) return loading;

  return (
    <Stack>
      {projects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </Stack>
  );
};

export default ProjectList;
