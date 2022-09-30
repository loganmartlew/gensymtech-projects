import { FC } from 'react';
import { Stack, Title } from '@mantine/core';
import ProjectForm from '../features/projects/ProjectForm';
import { useAllProjects } from '../features/projects/api/getProjects';

const NewProjectPage: FC = () => {
  const { data: projects, isLoading } = useAllProjects();

  if (isLoading) return <Title>Loading...</Title>;
  if (!projects) return null;

  return (
    <Stack>
      <Title order={2}>New Project</Title>
      <ProjectForm projects={projects} />
    </Stack>
  );
};

export default NewProjectPage;
