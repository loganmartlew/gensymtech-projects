import { ApiError } from '@gensymtech-projects/errors';
import { Request } from 'express';
import { IProject } from './entity-types';

export type ApiResponse<T> =
  | {
      status: number;
      message: string;
      data?: T;
      error?: never;
    }
  | {
      status: number;
      message: string;
      data?: never;
      error: ApiError;
    };

export type Controller<T> = (req: Request) => Promise<ApiResponse<T>>;
export type ExtractControllerData<T> = T extends Controller<infer U>
  ? U
  : never;

export type CreateProject = Controller<IProject>;
export type GetAllProjects = Controller<IProject[]>;
export type GetProject = Controller<IProject>;
export type UpdateProject = Controller<IProject>;
export type DeleteProject = Controller<IProject>;
export type MoveProjects = Controller<IProject[]>;

export type LoginAuth = Controller<void>;
export type LogoutAuth = Controller<void>;
