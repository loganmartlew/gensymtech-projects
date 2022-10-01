import {
  MoveProjects,
  ProjectMoveDTO,
} from '@gensymtech-projects/api-interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';
import { allProjectsKey } from './getAllProjects';

export const moveProjects = async (dtos: ProjectMoveDTO[]) => {
  return fetchFromApi<MoveProjects>(axios.put(`/projects/move`, { dtos }));
};

export const useMoveProjects = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(moveProjects, {
    onMutate: async (dtos) => {
      await queryClient.cancelQueries([...allProjectsKey]);

      const previousProjects = queryClient.getQueryData([...allProjectsKey]);

      queryClient.setQueryData([...allProjectsKey], () =>
        dtos.map((dto) => ({ ...dto, dependencies: [] }))
      );

      return { previousProjects };
    },
    onSettled: () => {
      queryClient.invalidateQueries([...allProjectsKey]);
    },
  });

  return mutate;
};
