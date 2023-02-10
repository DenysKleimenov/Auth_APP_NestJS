import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/dto/user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const passwordsMatch = await this.comparePasswords(pass, user.password);

    if (passwordsMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user['dataValues'];

      return result;
    }

    return null;
  }

  public async login(user: any) {
    const token = await this.generateToken(user);

    return { user, token };
  }

  public async create(user: UserDto) {
    const hashedPass = await this.hashPassword(user.password);

    const newUser = await this.usersService.createUser(
      user.username,
      user.email,
      hashedPass,
      user.role_id,
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser['dataValues'];

    const token = await this.generateToken(result);

    return { user: result, token };
  }

  private async generateToken(user: any) {
    const token = await this.jwtService.signAsync(user);

    return token;
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  private async comparePasswords(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);

    return match;
  }
}
