import { Controller } from '@gensymtech-projects/api-interfaces';
import express from 'express';
import ProjectController from '../features/projects/project.controller';
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
      handler?: never;
      subroutes: Route[];
    }
  | {
      path: string;
      method: Method;
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
            handler: ProjectController.create,
          },
          {
            path: '',
            method: Method.GET,
            handler: ProjectController.findAll,
          },
          {
            path: ':id',
            method: Method.GET,
            handler: ProjectController.findOne,
          },
          {
            path: ':id',
            method: Method.PUT,
            handler: ProjectController.update,
          },
          {
            path: ':id',
            method: Method.DELETE,
            handler: ProjectController.delete,
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
      router[route.method](`${path}`, formatResponse(route.handler));
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
