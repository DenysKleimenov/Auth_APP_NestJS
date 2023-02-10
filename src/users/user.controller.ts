import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Get()
  async getUserByName(@Body('name') name: string) {
    const foundUser = await this.usersService.findOne(name);

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
