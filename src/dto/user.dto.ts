import { IsNotEmpty, MinLength, IsEmail, IsEnum } from 'class-validator';

enum roleId {
  DEFAULT = 1,
  MANAGER = 2,
}

export class UserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(roleId, {
    message: 'role id must be either 1(Default) or 2(Manager)',
  })
  readonly role_id: number;
}
