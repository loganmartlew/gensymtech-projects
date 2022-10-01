import { LoginAuth } from '@gensymtech-projects/api-interfaces';

export default class AuthController {
  static login: LoginAuth = async (req) => {
    const { email, password } = req.body;

    // const [jwt, refresh] = await AuthService.login(email, password);

    return {
      status: 200,
      message: 'Login successful',
    };
  };
}
