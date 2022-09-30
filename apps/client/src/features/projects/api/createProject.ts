import { CreateProject, ProjectDTO } from '@gensymtech-projects/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
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
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createProject, {
    onSuccess,
    onError,
    onSettled: () => {
      queryClient.invalidateQueries([...allProjectsKey]);
    },
  });

  return { mutate, isLoading };
};
