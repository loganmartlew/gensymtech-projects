import { FC } from 'react';
import { Box, Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateUser } from './api/createUser';
import { UserDTO } from '@gensymtech-projects/api-interfaces';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateUserModal: FC<Props> = ({ open, handleClose }) => {
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => {
        if (!value.trim()) return 'Email is required';
        if (!value.includes('@')) return 'Email must be valid';
        return null;
      },
      password: (value) => {
        if (!value.trim()) return 'Password is required';
        return null;
      },
    },
  });

  const { mutate } = useCreateUser(() => {
    handleClose();
  });

  const handleSubmit = (values: FormValues) => {
    const dto: UserDTO = {
      email: values.email,
      password: values.password,
    };

    form.reset();
    handleClose();
    mutate(dto);
  };

  return (
    <Modal opened={open} onClose={handleClose} title="Create User">
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            type="email"
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            required
            {...form.getInputProps('email')}
          />

          <TextInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            withAsterisk
            required
            {...form.getInputProps('password')}
          />

          <Button type="submit" disabled={!form.isValid}>
            Login
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default CreateUserModal;
