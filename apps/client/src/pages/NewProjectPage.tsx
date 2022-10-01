import { FC } from 'react';
import { Stack, Title } from '@mantine/core';
import ProjectForm from '../features/projects/ProjectForm';
import { useAllProjects } from '../features/projects/api/getAllProjects';

const NewProjectPage: FC = () => {
  const { data: projects, isLoading } = useAllProjects();

  if (isLoading) return <Title order={4}>Loading...</Title>;
  if (!projects) return <Title order={2}>Projects Not Found</Title>;

  return (
    <Stack>
      <Title order={2}>New Project</Title>
      <ProjectForm projects={projects} />
    </Stack>
  );
};

export default NewProjectPage;
