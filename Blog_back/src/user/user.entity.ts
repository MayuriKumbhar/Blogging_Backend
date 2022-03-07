import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { BlogEntity } from './../blog/blog.entity';
import * as crypto from 'crypto-js';
import { Gender } from './gender.enum';
import { CommentEntity } from '../comment/blog.comment.entity';

@Entity('User')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  gender: Gender;

  @OneToMany((type) => BlogEntity, (blog) => blog.user, { eager: true })
  blogs: BlogEntity[];

  @OneToMany((type) => CommentEntity, (comment) => comment.user, {
    eager: true,
  })
  comments: CommentEntity;

  validatePassword(password: string) {
    const encrypted = `${crypto.MD5(password)}`;
    return encrypted == this.password;
  }
}
