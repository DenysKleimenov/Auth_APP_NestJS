import {
  Controller,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Get()
  async getUserByName(@Body('username') username: string) {
    const foundUser = await this.usersService.findOne(username);

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

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
