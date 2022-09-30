import { FC } from 'react';
import { Group } from '@mantine/core';
import StatusColumnCard from '../features/projects/StatusColumnCard';

const HomePage: FC = () => {
  return (
    <Group grow>
      <StatusColumnCard title="Planned">Planned</StatusColumnCard>
      <StatusColumnCard title="In Progress">In Progress</StatusColumnCard>
      <StatusColumnCard title="Completed">Completed</StatusColumnCard>
    </Group>
  );
};

export default HomePage;
