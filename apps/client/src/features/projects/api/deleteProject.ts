import { DeleteProject } from '@gensymtech-projects/api-interfaces';
import useCustomMutation from 'apps/client/src/util/useCustomMutation';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import { allProjectsKey } from './getProjects';

export const deleteProject = async (projectId: string) => {
  return fetchFromApi<DeleteProject>(axios.delete(`/projects/${projectId}`));
};

export const useDeleteProject = (
  onSuccess: () => void,
  onError?: (error: unknown, variables: string) => void
) => {
  return useCustomMutation<string>(deleteProject, {
    queryKey: () => allProjectsKey,
    onSuccess,
    onError,
    pendingMessage: 'Deleting project...',
    successMessage: 'Project deleted successfully',
    errorMessage: 'Failed to delete project',
  });
};
