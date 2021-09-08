import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEntity } from './password.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class LoginAuthService {
    constructor(
        @InjectRepository(PasswordEntity) private passwordRepo: Repository<PasswordEntity>,
        private userRepo: UsersRepository,
    ){}

    async createPassword(password: string, userId: string): Promise<PasswordEntity>{
        const user = await this.passwordRepo.findOne({where: {userId}})
        if(user){
            throw new UnauthorizedException("User already has password");
        }

        const newPassword = new PasswordEntity()
        newPassword.password = await bcrypt.hash(password, 10);
        newPassword.userId = userId;
        return await this.passwordRepo.save(newPassword);
    }

    async validateUser(userName: string, password: string): Promise<any> {
        const userId = (await this.userRepo.findOne({where: {userName}})).id;
        const user = await this.passwordRepo.findOne({where: {userId}});
        if (user && this.passwordCompare(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }

    private async passwordCompare(password: string, hash: string):Promise<boolean>{
        const isUser = await bcrypt.compare(password, hash);
        return isUser;
    }
}
