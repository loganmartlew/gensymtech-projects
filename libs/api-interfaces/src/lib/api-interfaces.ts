import { ApiError } from '@gensymtech-projects/errors';

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
