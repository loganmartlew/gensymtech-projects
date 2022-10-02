import { IUser } from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import { Request, Response, NextFunction } from 'express';
import { signJWT, verifyJWT } from '../../util/jwt';

export const setUser = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    return next();
  }

  const { payload: user, expired } = verifyJWT<IUser>(accessToken);

  if (user) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = user;
    return next();
  }

  const { payload: refresh } =
    expired && refreshToken
      ? verifyJWT<{ refresh: true }>(refreshToken)
      : { payload: null };

  if (!refresh) {
    return next();
  }

  const newAccessToken = signJWT(user, '15m');

  res.cookie('accessToken', newAccessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 15,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.user = verifyJWT<IUser>(newAccessToken).payload;

  return next();
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!req.user) {
    throw new ApiError(null, 5001, null);
  }

  return next();
};
