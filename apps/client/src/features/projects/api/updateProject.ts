import { UpdateProject, ProjectDTO } from '@gensymtech-projects/api-interfaces';
import useCustomMutation from 'apps/client/src/util/useCustomMutation';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import { allProjectsKey } from './getAllProjects';

type Vars = { id: string; dto: ProjectDTO };

export const updateProject = async ({ id, dto }: Vars) => {
  return fetchFromApi<UpdateProject>(
    axios.put(`/projects/${id}`, { projectDto: dto })
  );
};

export const useUpdateProject = (
  onSuccess: () => void,
  onError?: (error: unknown, variables: Vars) => void
) => {
  return useCustomMutation<Vars>(updateProject, {
    queryKey: (vars) => [...allProjectsKey, vars.id],
    onSuccess,
    onError,
    pendingMessage: 'Updating project...',
    successMessage: 'Project updated successfully',
    errorMessage: 'Failed to update project',
  });
};
