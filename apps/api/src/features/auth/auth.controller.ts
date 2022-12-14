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
      sameSite: 'none',
      secure: true,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: 'none',
      secure: true,
    });

    return {
      status: 200,
      message: 'Login successful',
      data: user,
    };
  };

  static logout: LogoutAuth = async (req, res) => {
    res.cookie('accessToken', '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'none',
      secure: true,
    });

    res.cookie('refreshToken', '', {
      httpOnly: true,
      maxAge: 0,
      sameSite: 'none',
      secure: true,
    });

    return {
      status: 200,
      message: 'Logout successful',
    };
  };
}
