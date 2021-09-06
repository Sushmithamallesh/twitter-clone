import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
    @Get('/')
    getAlltweets(): string{
        return 'get all tweets';
    }

    @Get('/:tweetId')
    getTweetInfo(@Param('tweetId') tweetId:string):string {
        return 'details of post';
    }

    @Post('/')
    createTweet(): string{
        return 'new post created';
    }

    @Delete('/:tweetId')
    deleteTweet(@Param('tweetId') tweetId:string): string {
        return 'deleted post';
    }

    @Put('/:tweetId/like')
    likePost(@Param('tweetID') tweetId:string): string {
        return 'like the post';
    }

    @Delete('/:tweetId/unlike')
    unlikePost(@Param('tweetId') tweetId:string): string {
        return 'unliked the post';
    }
}
