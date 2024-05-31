import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
@Controller('auth')
export class Authcontroller {
  constructor(private authServie: AuthService) {}
  @Post('/signup')
  signup(@Body() dot: AuthDto) {
    return this.authServie.signup(dot);
  }
  @Post('/signin')
  signin(@Body() dot: AuthDto) {
    return this.authServie.signin(dot);
  }
}
