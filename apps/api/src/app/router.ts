import express, { RequestHandler } from 'express';
import { Logger } from '../loaders/logger';

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
      handler: RequestHandler;
      subroutes: Route[];
    };

const routes: Route[] = [
  {
    path: '',
    subroutes: [
      {
        path: 'test',
        method: Method.GET,
        handler: (req, res) => {
          res.send('test');
        },
        subroutes: [],
      },
    ],
  },
];

const getRouter = () => {
  const router = express.Router();

  const assignRoute = (route: Route, currentPaths: string[]) => {
    const path = [...currentPaths, route.path].join('/') || '/';

    if (route.handler) {
      router[route.method](`${path}`, route.handler);
      Logger.info(
        `ROUTER: Route ${route.method.toUpperCase()} ${path} assigned`
      );
    }

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
