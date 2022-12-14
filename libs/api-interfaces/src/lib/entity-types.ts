import { ProjectStatus } from '@gensymtech-projects/types';

export interface IProject {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  order: number;
  dependencies: IProject[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  email: string;
}
