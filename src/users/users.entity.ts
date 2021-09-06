import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20, nullable: false, unique: true})
  userName: string;

  @Column({ length: 60})
  name: string;

  @Column({ length: 60, nullable: true})
  profilePicture: string;

  @Column({ length: 140, nullable: true})
  bio: string;

  @Column({ default:0 })
  followerCount: number;

  @Column({ default:0 })
  followingCount: number;
}