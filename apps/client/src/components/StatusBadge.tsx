import { ProjectStatus } from '@gensymtech-projects/types';
import { FC } from 'react';
import { Badge } from '@mantine/core';

interface Props {
  status: ProjectStatus;
}

const StatusBadge: FC<Props> = ({ status }) => {
  const variant = 'filled';

  switch (status) {
    case ProjectStatus.PLANNED:
      return (
        <Badge color="blue" variant={variant}>
          Planned
        </Badge>
      );
    case ProjectStatus.IN_PROGRESS:
      return (
        <Badge color="yellow" variant={variant}>
          In Progress
        </Badge>
      );
    case ProjectStatus.COMPLETED:
      return (
        <Badge color="green" variant={variant}>
          Completed
        </Badge>
      );
    default:
      return (
        <Badge color="gray" variant={variant}>
          Unknown
        </Badge>
      );
  }
};

export default StatusBadge;
