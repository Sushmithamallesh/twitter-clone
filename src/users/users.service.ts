import { Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private userRepo: UsersRepository){}

    public async getUserByName(userName: string) : Promise<UserEntity>{
        return await this.userRepo.findOne({ where: {userName} });
    }

    public async getUserById(userId: string) : Promise<UserEntity>{
        return await this.userRepo.findOne({ where: { id: userId } });
    }

    public async createUser(user: Partial<UserEntity>) : Promise<UserEntity>{
        return await this.userRepo.save(user);
    }
}
