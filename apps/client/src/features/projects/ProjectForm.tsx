import { IProject, ProjectDTO } from '@gensymtech-projects/api-interfaces';
import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Stack,
  TextInput,
  Textarea,
  Select,
  MultiSelect,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useCreateProject } from './api/createProject';

interface FormValues {
  name: string;
  description: string;
  status: ProjectStatus | null;
  dependencies: string[];
}

interface Props {
  projects: IProject[];
}

const ProjectForm: FC<Props> = ({ projects }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      description: '',
      status: null,
      dependencies: [],
    },

    validate: {
      name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 3)
          return 'Name must be at least 3 characters long';
        return null;
      },
      description: (value) => {
        if (!value.trim()) return 'Description is required';
        if (value.trim().length < 3)
          return 'Description must be at least 3 characters long';
        return null;
      },
      status: (value: ProjectStatus | null) => {
        if (!value) return 'Status is required';
        return null;
      },
    },
  });

  const { mutate } = useCreateProject(() => {
    form.reset();
    navigate('/');
  });

  const handleSubmit = (values: FormValues) => {
    const dto: ProjectDTO = {
      name: values.name,
      description: values.description,
      status: values.status ?? ProjectStatus.PLANNED,
      dependencies: values.dependencies,
    };

    mutate(dto);
  };

  return (
    <Paper
      sx={{
        padding: theme.spacing.lg,
      }}
    >
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Project Name"
            placeholder="Name"
            withAsterisk
            required
            {...form.getInputProps('name')}
          />

          <Textarea
            label="Project Description"
            placeholder="Description"
            withAsterisk
            required
            {...form.getInputProps('description')}
          />

          <Select
            label="Project Status"
            placeholder="Pick a status"
            withAsterisk
            required
            data={[
              { label: 'Planned', value: ProjectStatus.PLANNED },
              { label: 'In Progress', value: ProjectStatus.IN_PROGRESS },
              { label: 'Completed', value: ProjectStatus.COMPLETED },
            ]}
            {...form.getInputProps('status')}
          />

          <MultiSelect
            label="Project Dependencies"
            placeholder={projects.length ? 'Pick dependencies' : 'No projects'}
            data={projects.map((project) => ({
              label: project.name,
              value: project.id,
            }))}
            {...form.getInputProps('dependencies')}
          />

          <Button type="submit">Create Project</Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ProjectForm;
