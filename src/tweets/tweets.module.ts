import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/users/users.repository';
import { RelationshipEntity } from 'src/users/relationships.entity';
import { TweetsEntity } from './tweets.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository, TweetsEntity, RelationshipEntity])],
    controllers: [TweetsController],
    providers: [TweetsService]
})
export class TweetsModule {}