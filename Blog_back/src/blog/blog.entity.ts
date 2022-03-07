import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogTags } from './blog.enum';
import { UserEntity } from './../user/user.entity';

@Entity('Blog')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tag: BlogTags;

  @ManyToOne((type) => UserEntity, (user) => user.blogs, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
