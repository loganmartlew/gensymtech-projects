import { ApiResponse, Controller } from '@gensymtech-projects/api-interfaces';
import { NextFunction, Request, Response } from 'express';

const responseFn = (json: ApiResponse<unknown>, res: Response) => {
  return res.status(json.status).json(json);
};

export default (controller: Controller<unknown>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      responseFn(await controller(req, res), res);
    } catch (err) {
      next(err);
    }
  };
};
