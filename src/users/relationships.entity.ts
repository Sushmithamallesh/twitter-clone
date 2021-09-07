import { UserEntity } from "./users.entity";
import { Entity, JoinColumn, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Unique('relationship', ['follower', 'followee'])
@Entity('relationships')
export class RelationshipEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @JoinColumn({name: 'followerId'})
    @ManyToOne(() => UserEntity)
    follower: UserEntity

    @JoinColumn({ name: 'followeeId'})
    @ManyToOne(() => UserEntity)
    followee: UserEntity;
}