import { FC, ReactNode } from 'react';
import { Paper, Stack, Title, useMantineTheme } from '@mantine/core';

interface Props {
  children: ReactNode;
  title: string;
}

const StatusColumnCard: FC<Props> = ({ children, title }) => {
  const theme = useMantineTheme();

  return (
    <Paper
      sx={{
        padding: theme.spacing.md,
        boxShadow: theme.shadows.sm,
        flexBasis: 1,
      }}
    >
      <Stack>
        <Title order={3}>{title}</Title>
        {children}
      </Stack>
    </Paper>
  );
};

export default StatusColumnCard;
