import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../config';

const privateKey = jwtConfig().privateKey;
const publicKey = jwtConfig().publicKey;

export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.includes('jwt expired') };
  }
}
