import { UserEntity } from 'src/users/users.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToOne, CreateDateColumn} from 'typeorm';

@Entity('tweets')
export class TweetsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 140, nullable: true})
  tweetContent: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  authorId: UserEntity;

  @Column({ default: 0 })
  likeCount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}