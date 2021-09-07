import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAuthService } from 'src/login-auth/login-auth.service';
import { RelationshipEntity } from './relationships.entity';

@Injectable()
export class UsersService {
    constructor(
        private userRepo: UsersRepository,
        private loginAuthService: LoginAuthService,
        @InjectRepository(RelationshipEntity)
        private userFollowRepo: Repository<RelationshipEntity>){}

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
        followerId: string,
        followeeId: string
    ){
        const follower = await this.getUserById(followerId); 
        const followee =  await this.getUserById(followeeId);
        if(!followee){
            throw new NotFoundException("we cant find the followee");
        }
        const follow = await this.userFollowRepo.save({follower, followee});
        return follow.followee;
    }

    public async deleteUserFollower(
        followerId: string,
        followeeId: string
    ){
        const follower = await this.getUserById(followerId); 
        const followee =  await this.getUserById(followeeId);
        if(!followee){
            throw new NotFoundException("we cant find the followee");
        }
        const follow = await this.userFollowRepo.delete({follower, followee});
        return followee;
    }
}
