import { Inject, Injectable, NotFoundException, Req, Scope } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAuthService } from 'src/login-auth/login-auth.service';
import { RelationshipEntity } from './relationships.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(
        private userRepo: UsersRepository,
        private loginAuthService: LoginAuthService,
        @InjectRepository(RelationshipEntity)
        private userFollowRepo: Repository<RelationshipEntity>,
        @Inject(REQUEST) private readonly request: Request){}

    public async getUserByName(userName: string) : Promise<UserEntity>{
        return await this.userRepo.findOne({ where: {userName} });
    }

    public async getUserById(userId: string) : Promise<UserEntity>{
        return await this.userRepo.findOne({ where: { id: userId } });
    }

    public async createUser(user: Partial<UserEntity>, password: string) : Promise<UserEntity>{
        const newUser = await this.userRepo.save(user);
        
        await this.loginAuthService.createPassword(password, newUser.id);
        
        return newUser;
    }

    public async createUserFollower(
        followeeId: string,
    ){
        const followee = await this.getUserById(followeeId);
        const follower = this.request.user['userId'];
        if(!followee){
            throw new NotFoundException("We cant find the followee");
        }
        const follow = await this.userFollowRepo.save({
            follower,
            followee,
          });
        return follow.followee;
    }

    public async deleteUserFollower(
        followeeId: string
    ){
        const follower = this.request.user['userId'];
        const followee =  await this.getUserById(followeeId);
        const relationship = await this.userFollowRepo.findOne({follower, followee});
        if(!relationship){
            throw new NotFoundException("The users dont follow each other already");
        }
        await this.userFollowRepo.delete(relationship);
        return followee;
    }
}
