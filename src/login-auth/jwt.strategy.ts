import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class JWTStartegy extends PassportStrategy(Strategy){
    constructor(private userRepo: UsersRepository){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey : 'SECRET'
        })
    }

    async validate(payload: any){
        return { userId: payload.sub, userName: payload.name}
    }
}