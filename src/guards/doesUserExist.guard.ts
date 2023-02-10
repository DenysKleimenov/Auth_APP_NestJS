import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.validateRequest(request);
  }

  async validateRequest(request) {
    if (request.body.username) {
      const usernameExist = await this.usersService.findOne(
        request.body.username,
      );
      // const emailExist = await this.usersService.findOneByEmail(
      //   request.body.email,
      // );

      if (usernameExist) {
        throw new ForbiddenException(
          'Account with this username already exists',
        );
      }
    }

    if (request.body.email) {
      const emailExist = await this.usersService.findOneByEmail(
        request.body.email,
      );

      if (emailExist) {
        throw new ForbiddenException('Account with this email already exists');
      }
    }

    return true;
  }
}
