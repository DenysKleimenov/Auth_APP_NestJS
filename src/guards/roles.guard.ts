import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/roles/role.enum';
import { ROLES_KEY } from 'src/roles/roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { headers } = context.switchToHttp().getRequest();

    if (!headers.authorization) {
      return false;
    }

    const bearerToken = headers.authorization.slice(7);
    const user = this.jwtService.decode(bearerToken);

    return requiredRoles.some((role) => user['role_id'] === role);
  }
}
