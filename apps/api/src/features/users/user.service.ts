import { UserDTO } from '@gensymtech-projects/api-interfaces';
import { ApiError } from '@gensymtech-projects/errors';
import { hash } from '../../util/hash';
import User from './user.entity';

export default class UserService {
  static async create(userDto: UserDTO): Promise<User> {
    const newUser = await User.create();

    if (!newUser) throw new ApiError(null, 3004, 'Unable to create user');

    newUser.email = userDto.email;
    newUser.password = hash(userDto.password);

    try {
      const event = await newUser.save();
      return event;
    } catch (error) {
      throw new ApiError(error, 3003, 'Unable to save user');
    }
  }

  static async findOne(id: string): Promise<User> {
    const user = await User.findOne({
      where: { id },
    });

    if (!user) {
      throw new ApiError(null, 3002, 'User not found');
    }

    return user;
  }
}
