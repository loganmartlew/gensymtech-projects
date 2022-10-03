import { Controller } from '@gensymtech-projects/api-interfaces';
import express from 'express';
import AuthController from '../features/auth/auth.controller';
import { requireAuth } from '../features/auth/auth.middleware';
import ProjectController from '../features/projects/project.controller';
import UserController from '../features/users/user.controller';
import { Logger } from '../loaders/logger';
import formatResponse from './formatResponse';

enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

type Route =
  | {
      path: string;
      method?: never;
      protected?: never;
      handler?: never;
      subroutes: Route[];
    }
  | {
      path: string;
      method: Method;
      protected: boolean;
      handler: Controller<unknown>;
      subroutes?: never;
    };

const routes: Route[] = [
  {
    path: '',
    subroutes: [
      {
        path: 'projects',
        subroutes: [
          {
            path: '',
            method: Method.POST,
            protected: true,
            handler: ProjectController.create,
          },
          {
            path: '',
            method: Method.GET,
            protected: false,
            handler: ProjectController.findAll,
          },
          {
            path: 'move',
            method: Method.PUT,
            protected: true,
            handler: ProjectController.move,
          },
          {
            path: ':id',
            method: Method.GET,
            protected: false,
            handler: ProjectController.findOne,
          },
          {
            path: ':id',
            method: Method.PUT,
            protected: true,
            handler: ProjectController.update,
          },
          {
            path: ':id',
            method: Method.DELETE,
            protected: true,
            handler: ProjectController.delete,
          },
        ],
      },
      {
        path: 'auth',
        subroutes: [
          {
            path: 'login',
            method: Method.POST,
            protected: false,
            handler: AuthController.login,
          },
          {
            path: 'logout',
            method: Method.POST,
            protected: false,
            handler: AuthController.logout,
          },
        ],
      },
      {
        path: 'users',
        subroutes: [
          {
            path: '',
            method: Method.POST,
            protected: true,
            handler: UserController.create,
          },
        ],
      },
    ],
  },
];

const getRouter = () => {
  const router = express.Router();

  const assignRoute = (route: Route, currentPaths: string[]) => {
    const path = [...currentPaths, route.path].join('/') || '/';

    if (route.handler) {
      if (route.protected) {
        router[route.method](
          `${path}`,
          requireAuth,
          formatResponse(route.handler)
        );
      } else {
        router[route.method](`${path}`, formatResponse(route.handler));
      }

      Logger.info(
        `ROUTER: Route ${route.method.toUpperCase()} ${path} assigned`
      );
    }

    if (!route.subroutes) return;

    for (const subroute of route.subroutes) {
      assignRoute(subroute, [...currentPaths, route.path]);
    }
  };

  for (const route of routes) {
    assignRoute(route, []);
  }

  return router;
};

export default getRouter;
