import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { PasswordEntity } from 'src/login-auth/password.entity';
import { RelationshipEntity } from './relationships.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository, PasswordEntity, RelationshipEntity])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
