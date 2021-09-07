import { UserEntity } from "src/users/users.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('passwords')
export class PasswordEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @JoinColumn({name: 'userId'})
    @OneToOne(() => UserEntity)
    user: UserEntity;
    
    @Column({ nullable: false})
    password: string;
}