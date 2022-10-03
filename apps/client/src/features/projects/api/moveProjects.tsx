import {
  MoveProjects,
  ProjectMoveDTO,
} from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import { showNotification } from '@mantine/notifications';
import { IconExclamationMark } from '@tabler/icons';
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
    onError: (error: ApiError) => {
      showNotification({
        title: 'Error moving project',
        message: !error.message
          ? 'Failed to move project'
          : `${error.errorCode}: ${error.message}`,
        color: 'red',
        icon: <IconExclamationMark size={16} />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries([...allProjectsKey]);
    },
  });

  return mutate;
};
