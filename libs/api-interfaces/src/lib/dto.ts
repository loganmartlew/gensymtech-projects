import { ProjectStatus } from '@gensymtech-projects/types';

export interface ProjectDTO {
  name: string;
  description: string;
  status: ProjectStatus;
  dependencies: string[];
}

export interface ProjectMoveDTO extends ProjectDTO {
  id: string;
  order: number;
}
