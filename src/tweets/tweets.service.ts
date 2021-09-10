import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { UsersRepository } from "src/users/users.repository";
import { TweetsEntity } from "./tweets.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })

@Injectable({ scope: Scope.REQUEST })
export class TweetsService {
    constructor(
        private userRepo: UsersRepository,
        @InjectRepository(TweetsEntity) private tweetRepo: Repository<TweetsEntity>,
        @Inject(REQUEST) private readonly request: Request){}

    async getAllTweets():Promise<Array<TweetsEntity>>{
        const queryBuilder = this.tweetRepo
              .createQueryBuilder('tweets')
              .leftJoinAndSelect('tweets.authorId', 'authorId')
              .addSelect('tweets.authorId');
        
        const authorId = this.request.user['userId'];

        if (authorId) {
            queryBuilder.where(`tweets.authorId = :authorId`, { authorId });
        }
        return queryBuilder
            .addSelect('tweets.created_at')
            .orderBy('tweets.created_at', 'DESC')
            .limit(100)
            .getMany();    
    }

    async createTweet(tweetContent: string){
        const authorId = this.request.user['userId'];
        const tweet = await this.tweetRepo.save({authorId, tweetContent})
        return tweet;
    }

    async getTweet(tweetId: string){
        return await this.tweetRepo.findOne({where:{id:tweetId}});
    }

    async deleteTweet(id:string){
        const tweet = await this.tweetRepo.findOne({where:{id:id}});;
        await this.tweetRepo.delete(id);
        return tweet;
    }

    async likeTweet(tweetId: string){
        const existingTweet = await this.tweetRepo.findOne({
            where: { id: tweetId },
          });
        
        existingTweet.likeCount += 1;
        await this.tweetRepo.save(existingTweet);
        return existingTweet;
    }

    async unlikeTweet(tweetId: string){
        const existingTweet = await this.tweetRepo.findOne({
            where: { id: tweetId },
          });
        
        if (existingTweet.likeCount != 0){
            existingTweet.likeCount -= 1;
        }
        await this.tweetRepo.save(existingTweet);
        return existingTweet;
    }
}