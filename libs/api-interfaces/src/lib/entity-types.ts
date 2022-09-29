import { ProjectStatus } from '@gensymtech-projects/types';

export interface IProject {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  order: number;
  dependencies: IProject[];
  dependants: IProject[];
  createdAt: Date;
  updatedAt: Date;
}
