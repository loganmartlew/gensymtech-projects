import { FC } from 'react';
import { Stack, Title } from '@mantine/core';
import ProjectForm from '../features/projects/ProjectForm';

const NewProjectPage: FC = () => {
  return (
    <Stack>
      <Title order={2}>New Project</Title>
      <ProjectForm projects={[]} />
    </Stack>
  );
};

export default NewProjectPage;
