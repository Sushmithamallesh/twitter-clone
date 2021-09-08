import { Global, Module } from '@nestjs/common';
import { LoginAuthController } from './login-auth.controller';
import { LoginAuthService } from './login-auth.service';
import { PasswordEntity } from './password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy';
import { UserEntity } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity, UsersRepository])],
  controllers: [LoginAuthController],
  providers: [LoginAuthService, LocalStrategy],
  exports: [LoginAuthService],
})

export class LoginAuthModule {}
