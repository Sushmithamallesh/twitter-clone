import { Global, Module } from '@nestjs/common';
import { LoginAuthController } from './login-auth.controller';
import { LoginAuthService } from './login-auth.service';
import { PasswordEntity } from './password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity])],
  controllers: [LoginAuthController],
  providers: [LoginAuthService],
  exports: [LoginAuthService],
})

export class LoginAuthModule {}
