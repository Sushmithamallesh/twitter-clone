import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEntity } from './password.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class LoginAuthService {
    constructor(
        @InjectRepository(PasswordEntity)
        private passwordRepo: Repository<PasswordEntity>,
        private userRepo: UsersRepository,
        private jwtService: JwtService
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
        const user = await this.userRepo.findOne({where: {userName}});
        if(!user){
            return null;
        }
        const userPassword = await this.passwordRepo.findOne({where: {userId : user.id}});
        const isUser = await this.passwordCompare(password, userPassword.password);
        if (userPassword && isUser) {
          return user;
        }
        return null;
      }

    async login(user:any){
        const loginUser = await this.userRepo.findOne({where: {userName: user.username}});
        const payload = { name: user.name, sub: loginUser.id }
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    private async passwordCompare(password: string, hash: string):Promise<boolean>{
        return bcrypt.compareSync(password, hash);
    }
}
