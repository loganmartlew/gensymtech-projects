import { LoginAuth, LogoutAuth } from '@gensymtech-projects/api-interfaces';
import AuthService from './auth.service';

export default class AuthController {
  static login: LoginAuth = async (req, res) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await AuthService.login(
      email,
      password
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 15,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return {
      status: 200,
      message: 'Login successful',
      data: user,
    };
  };

  static logout: LogoutAuth = async (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return {
      status: 200,
      message: 'Logout successful',
    };
  };
}
