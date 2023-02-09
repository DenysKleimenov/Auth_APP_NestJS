import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role_id') role_id: number,
  ) {
    return this.usersService.createUser(name, email, password, role_id);
  }

  @Get()
  async getUserByEmail(@Body('email') email: string) {
    const foundUser = await this.usersService.findOneByEmail(email);

    if (!foundUser) {
      throw new NotFoundException('Could not find user');
    }

    return foundUser;
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const foundUser = await this.usersService.findOneById(id);

    if (!foundUser) {
      throw new NotFoundException('Could not find user');
    }

    return foundUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
