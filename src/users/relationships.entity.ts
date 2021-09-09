import { UserEntity } from "./users.entity";
import { Entity, JoinColumn, ManyToOne, Unique, PrimaryGeneratedColumn } from 'typeorm';

@Unique('relationship_pair', ['follower', 'followee'])
@Entity('relationships')
export class RelationshipEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @JoinColumn({ name: 'follower_id' })
    @ManyToOne(() => UserEntity)
    follower: UserEntity;

    @JoinColumn({ name: 'followee_id' })
    @ManyToOne(() => UserEntity)
    followee: UserEntity;
}