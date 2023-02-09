import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  createUser(name: string, email: string, password: string, role_id: number) {
    return this.userModel.create({ name, email, password, role_id });
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  findOneById(id: number) {
    return this.userModel.findByPk(id);
  }

  deleteUser(id: number) {
    return this.userModel.destroy({
      where: {
        id,
      },
    });
  }
}
