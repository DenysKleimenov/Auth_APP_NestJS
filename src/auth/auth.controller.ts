import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { DoesUserExist } from 'src/guards/doesUserExist.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user);

    return this.authService.login(req.user);
  }

  @UseGuards(DoesUserExist)
  @Post('signup')
  signUp(@Body() user: UserDto) {
    return this.authService.create(user);
  }
}
