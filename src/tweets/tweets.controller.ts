import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TweetsService } from './tweets.service';
import { ApiBearerAuth, ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { JwtAuthGaurd } from 'src/login-auth/jwt-auth.gaurd';
import { JWTStartegy } from 'src/login-auth/jwt.strategy';
import { TweetsEntity } from './tweets.entity';
import { query } from 'express';
import { throws } from 'assert';

export class TweetDetails{
    @ApiProperty() text:string;
}

class TweetDetailsQueryParams {
    @ApiPropertyOptional() authorId: string;
}

@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
    constructor(private tweetService: TweetsService){}

    @UseGuards(JwtAuthGaurd)
    @Get('/')
    async getAlltweets(): Promise<TweetsEntity[]>{
        return await this.tweetService.getAllTweets();
    }

    @Get('/:tweetId')
    async getTweetInfo(@Param('tweetId') tweetId:string):Promise<TweetsEntity> {
        return await this.tweetService.getTweet(tweetId);
    }

    @UseGuards(JwtAuthGaurd)
    @Post('/')
    async createTweet(@Body() tweetContent: TweetDetails): Promise<Partial<TweetsEntity>>{
        const tweet = await this.tweetService.createTweet(tweetContent.text);
        return { tweetContent: tweet.tweetContent, authorId: tweet.authorId };
    }

    @UseGuards(JwtAuthGaurd)
    @Delete('/:tweetId')
    async deleteTweet(@Param('tweetId') tweetId:string): Promise<string> {
        await this.tweetService.deleteTweet(tweetId);
        return;
    }

    @UseGuards(JwtAuthGaurd)
    @Put('/:tweetId/like')
    async likePost(@Param('tweetId') tweetId:string): Promise<number> {
        return await this.tweetService.likeTweet(tweetId);
    }

    @Delete('/:tweetId/unlike')
    async unlikePost(@Param('tweetId') tweetId:string): Promise<number> {
        return await this.tweetService.unlikeTweet(tweetId);
    }
}
