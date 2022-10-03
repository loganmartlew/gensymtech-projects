import { ApiError } from '@gensymtech-projects/errors';
import { Request, Response } from 'express';
import { IProject, IUser } from './entity-types';

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

export type Controller<T> = (
  req: Request,
  res?: Response
) => Promise<ApiResponse<T>>;
export type ExtractControllerData<T> = T extends Controller<infer U>
  ? U
  : never;

export type CreateProject = Controller<IProject>;
export type GetAllProjects = Controller<IProject[]>;
export type GetProject = Controller<IProject>;
export type UpdateProject = Controller<IProject>;
export type DeleteProject = Controller<IProject>;
export type MoveProjects = Controller<IProject[]>;

export type LoginAuth = Controller<IUser>;
export type LogoutAuth = Controller<void>;

export type CreateUser = Controller<IUser>;
