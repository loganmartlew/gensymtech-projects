import { ApiError } from '@gensymtech-projects/errors';
import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { v4 as uuid } from 'uuid';
import { showNotification, updateNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

function useCustomMutation<Vars>(
  mutationFn: (variables: Vars) => Promise<unknown>,
  options: {
    queryKey: (variables: Vars) => string | string[];
    onSuccess: () => void;
    onError?: (error: unknown, variables: Vars) => void;
    pendingMessage: string;
    successMessage: string;
    errorMessage: string;
  }
) {
  const {
    queryKey,
    onSuccess,
    onError,
    pendingMessage,
    successMessage,
    errorMessage,
  } = options;

  const queryClient = useQueryClient();
  const notificationRef = useRef<string | null>(null);

  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      if (notificationRef.current) {
        updateNotification({
          id: notificationRef.current,
          title: 'Success',
          message: successMessage,
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      }
      onSuccess();
    },
    onError: (error: ApiError, variables: Vars) => {
      if (notificationRef.current) {
        updateNotification({
          id: notificationRef.current,
          title: 'Failed',
          message: !error.message
            ? errorMessage
            : `${error.errorCode}: ${error.message}`,
          color: 'red',
          icon: <IconExclamationMark size={16} />,
        });
      }

      if (onError) {
        onError(error, variables);
      }
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries(queryKey(variables));
    },
  });

  const initialize = useCallback(
    (variables: Vars) => {
      notificationRef.current = uuid();
      showNotification({
        id: notificationRef.current,
        title: 'Pending',
        message: pendingMessage,
        color: 'blue',
        loading: true,
      });

      mutate(variables);
    },
    [mutate, pendingMessage]
  );

  return { mutate: initialize, isLoading };
}

export default useCustomMutation;
