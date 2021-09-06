import { UserEntity } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('tweets')
export class TweetsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 140, nullable: false})
  text: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Column({ default: 0 })
  likeCount: number;
}