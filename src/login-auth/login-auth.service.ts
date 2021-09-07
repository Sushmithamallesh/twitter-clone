import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordEntity } from './password.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginAuthService {
    constructor(
        @InjectRepository(PasswordEntity) private passwordRepo: Repository<PasswordEntity>
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

    private async passwordCompare(password: string, hash: string):Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }
}
