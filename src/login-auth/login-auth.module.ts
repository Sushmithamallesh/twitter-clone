import { Global, Module } from '@nestjs/common';
import { LoginAuthController } from './login-auth.controller';
import { LoginAuthService } from './login-auth.service';
import { PasswordEntity } from './password.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './local.strategy';
import { UsersRepository } from 'src/users/users.repository';
import { JwtModule } from '@nestjs/jwt'
import { JWTStartegy } from './jwt.strategy';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([PasswordEntity, UsersRepository]), 
    JwtModule.register({
        secret: 'SECRET', 
        signOptions: {expiresIn:'60s'}})],
  controllers: [LoginAuthController],
  providers: [LoginAuthService, LocalStrategy, JWTStartegy],
  exports: [LoginAuthService],
})

export class LoginAuthModule {}
