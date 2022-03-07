import { UserEntity } from 'src/user/user.entity';
import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  comment: string;

  @ManyToOne((type) => UserEntity, (user) => user.comments, { eager: false })
  user: UserEntity;
}
