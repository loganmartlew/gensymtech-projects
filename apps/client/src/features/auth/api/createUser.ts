import { CreateUser, UserDTO } from '@gensymtech-projects/api-interfaces';
import useCustomMutation from '../../../util/useCustomMutation';
import { axios } from '../../../config/axios';
import fetchFromApi from '../../../util/fetchFromApi';

export const createUser = async (userDto: UserDTO) => {
  return fetchFromApi<CreateUser>(axios.post('/users', { userDto }));
};

export const useCreateUser = (
  onSuccess: () => void,
  onError?: (error: unknown, variables: UserDTO) => void
) => {
  return useCustomMutation<UserDTO>(createUser, {
    queryKey: () => '',
    onSuccess,
    onError,
    pendingMessage: 'Creating user...',
    successMessage: 'User created successfully',
    errorMessage: 'Failed to create user',
  });
};
