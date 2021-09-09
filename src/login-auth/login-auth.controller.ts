import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common';
import { LoginAuthService } from './login-auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {LocalAuthGaurd } from './local-auth.gaurd'

class LoginRequestBody {
    @ApiProperty() username: string;
    @ApiProperty() password: string;
  }

@UseGuards(LocalAuthGaurd)
@Controller('login-auth')
export class LoginAuthController {
    constructor(private loginAuthService: LoginAuthService){}

    @Post('/login')
    login(@Body() user: LoginRequestBody):any{
        return this.loginAuthService.login(user); 
    }
}
