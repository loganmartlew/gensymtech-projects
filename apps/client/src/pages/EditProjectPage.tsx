import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Title } from '@mantine/core';
import { useProject } from '../features/projects/api/getProject';
import { useAllProjects } from '../features/projects/api/getAllProjects';
import ProjectForm from '../features/projects/ProjectForm';

const EditProjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading: projectLoading } = useProject(id || '0');
  const { data: projects, isLoading: allProjectsLoading } = useAllProjects();

  const isLoading = projectLoading || allProjectsLoading;

  if (isLoading) return <Title order={4}>Loading...</Title>;
  if (!project) return <Title order={2}>Project Not Found</Title>;
  if (!projects) return <Title order={2}>Projects Not Found</Title>;

  return (
    <Stack>
      <Title order={2}>{project.name}</Title>
      <ProjectForm projects={projects} editProject={project} />
    </Stack>
  );
};

export default EditProjectPage;
