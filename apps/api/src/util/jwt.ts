import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../config';

const privateKey = jwtConfig().privateKey.replace(/\\n/g, '\n');
const publicKey = jwtConfig().publicKey.replace(/\\n/g, '\n');

export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}

export function verifyJWT<T>(token: string): { payload: T; expired: boolean } {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes('jwt expired') };
  }
}
