import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { TweetsModule } from './tweets/tweets.module';
import { LoginAuthModule } from './login-auth/login-auth.module';
import { TweetsEntity } from './tweets/tweets.entity';
import { PasswordEntity } from './login-auth/password.entity';
import { RelationshipEntity } from './users/relationships.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'anyadmin',
      password: 'anypass',
      database: 'twitterclone',
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      entities: [UserEntity, TweetsEntity, PasswordEntity, RelationshipEntity]
    }),
    UsersModule,
    TweetsModule,
    LoginAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

