import { Module } from '@nestjs/common';
import { TweetsController } from './tweets.controller';

@Module({
    controllers: [TweetsController],
})
export class TweetsModule {}
