import { CreateUser } from '@gensymtech-projects/api-interfaces';
import UserService from './user.service';

export default class UserController {
  static create: CreateUser = async (req) => {
    const { userDto } = req.body;

    const user = await UserService.create(userDto);

    return {
      status: 200,
      message: 'Login successful',
      data: { id: user.id, email: user.email },
    };
  };
}
