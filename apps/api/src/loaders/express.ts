import { ApiError } from '@gensymtech-projects/errors';
import { Express, Request, Response, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getRouter from '../app/router';
import { Logger } from './logger';
import { ApiResponse } from '@gensymtech-projects/api-interfaces';
import { setUser } from '../features/auth/auth.middleware';
import { environment } from '../environments/environment';

export default (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      Logger.error(error);

      let apiError: ApiError;

      if (error instanceof ApiError) {
        apiError = error;
      } else {
        apiError = new ApiError(error, 1000, null);
      }

      const response: ApiResponse<never> = {
        status: apiError.statusCode,
        message: apiError.message,
        error: apiError,
      };

      res.status(apiError.statusCode).json(response);
    }
  });

  app.use(
    cors({
      credentials: true,
      origin: environment.clientUrl,
    })
  );
  app.use(json());
  app.use(cookieParser());
  app.use(urlencoded({ extended: true }));

  app.use(setUser);

  app.use(getRouter());

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    Logger.error(error);

    let apiError: ApiError;

    if (error instanceof ApiError) {
      apiError = error;
    } else {
      apiError = new ApiError(error, 1000, null);
    }

    const response: ApiResponse<never> = {
      status: apiError.statusCode,
      message: apiError.message,
      error: apiError,
    };

    res.status(apiError.statusCode).json(response);
  });
};
