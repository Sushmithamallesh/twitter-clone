import { Body, Delete, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

export class UserCreationDetails{
    @ApiProperty() userName: string;
    @ApiProperty() password: string;
    @ApiProperty() name: string;
    @ApiProperty({ required: false }) profilePicture?: string; 
    @ApiProperty({ required: false }) bio?: string;
}

@ApiTags('user')
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get('/@:userName')
    async getUserByUserName(@Param('userName') userName:string): Promise<UserEntity>{
        const user = await this.userService.getUserByName(userName);
        if(!user){
            throw new NotFoundException('not found user');
        }
        return user;
    }

    @Get('/:userId')
    async getUser(@Param('userId') userId:string): Promise<UserEntity>{
        const user = await this.userService.getUserById(userId);
        if(!user){
            throw new NotFoundException('hereh no');
        }
        return user;
    }

    @Post('/')
    async createUser(@Body() userCreationDetails: UserCreationDetails): Promise<UserEntity>{
        const user = await this.userService.createUser(userCreationDetails, userCreationDetails.password);
        return user;
    }

    @Put('/:userid/follow')
    async followUser(@Param('userID') followerId: string, @Param('userId')followeeId: string): Promise<UserEntity> {
        return await this.userService.createUserFollower(followerId, followeeId);
    }

    @Delete('/:userid/follow')
    async unfollowUser(@Param('userID') followerId: string, @Param('userId')followeeId: string): Promise<UserEntity>{
        return await this.userService.deleteUserFollower(followerId, followeeId);
    }
}