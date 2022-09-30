import { CreateProject, ProjectDTO } from '@gensymtech-projects/api-interfaces';
import useCustomMutation from 'apps/client/src/util/useCustomMutation';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import { allProjectsKey } from './getProjects';

export const createProject = async (projectDto: ProjectDTO) => {
  return fetchFromApi<CreateProject>(axios.post('/projects', { projectDto }));
};

export const useCreateProject = (
  onSuccess: () => void,
  onError?: (error: unknown, variables: ProjectDTO) => void
) => {
  return useCustomMutation<ProjectDTO>(createProject, {
    queryKey: () => allProjectsKey,
    onSuccess,
    onError,
    pendingMessage: 'Creating project...',
    successMessage: 'Project created successfully',
    errorMessage: 'Failed to create project',
  });
};
