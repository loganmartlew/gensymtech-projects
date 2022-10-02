import { IUser } from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import { compare } from '../../util/hash';
import { signJWT } from '../../util/jwt';
import UserService from '../users/user.service';

export default class AuthService {
  static async login(email, password) {
    try {
      const user = await UserService.findOneByEmail(email);
      if (!user) throw new ApiError(null, 3002, 'User not found');

      const userWithoutPassword: IUser = { id: user.id, email: user.email };

      const valid = compare(password, user.password);
      if (!valid) throw new ApiError(null, 5001, null);

      const accessToken = signJWT(userWithoutPassword, '15m');
      const refreshToken = signJWT(userWithoutPassword, '7d');

      return {
        accessToken,
        refreshToken,
        user: userWithoutPassword,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.errorCode === 3002) {
          throw new ApiError(error, 5001, null);
        }
      }

      throw error;
    }
  }
}
