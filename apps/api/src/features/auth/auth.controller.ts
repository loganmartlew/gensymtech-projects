import { LoginAuth } from '@gensymtech-projects/api-interfaces';
import AuthService from './auth.service';

export default class AuthController {
  static login: LoginAuth = async (req) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await AuthService.login(
      email,
      password
    );

    return {
      status: 200,
      message: 'Login successful',
    };
  };
}
